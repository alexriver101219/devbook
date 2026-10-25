require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const crypto = require('crypto');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const PDFDocument = require('pdfkit');
const { renderEbook } = require('./ebook');

const app = express();
const appOrigin = process.env.APP_ORIGIN || 'http://localhost:8085';
app.use(cors({
    origin(origin, callback) {
        const isLocalOrigin = origin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
        callback(null, !origin || origin === appOrigin || isLocalOrigin);
    },
    credentials: true
}));
app.use(express.json({ strict: false }));
app.use((req, res, next) => {
    if (req.body === null) req.body = {};
    next();
});

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const requiredDatabaseSettings = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];

function getMissingDatabaseSettings() {
    return requiredDatabaseSettings.filter(name => !process.env[name] || !process.env[name].trim());
}

function logDatabaseError(context, error) {
    console.error(`${context} database error:`, {
        code: error.code || 'UNKNOWN',
        syscall: error.syscall || 'unknown',
        environment: process.env.VERCEL ? 'vercel' : 'local'
    });
}

const product = {
    id: 'guia-analisis-desarrollo-software',
    title: 'Guía profesional de análisis y desarrollo de software',
    currency: 'COP',
    price: 39900
};
const sessionCookieName = 'devbook_session';
const sessionDurationSeconds = 60 * 60 * 24;
let purchaseTableReady;

function getSessionSecret() {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret === 'generate_a_random_secret_at_least_32_bytes' || Buffer.byteLength(secret, 'utf8') < 32) {
        return null;
    }
    return secret;
}

function createSession(userId) {
    const secret = getSessionSecret();
    if (!secret) {
        throw new Error('SESSION_SECRET is not configured');
    }

    const payload = Buffer.from(JSON.stringify({
        userId,
        expiresAt: Date.now() + sessionDurationSeconds * 1000
    })).toString('base64url');
    const signature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('base64url');
    return `${payload}.${signature}`;
}

function getSessionUserId(req) {
    const cookieHeader = req.headers.cookie || '';
    const cookie = cookieHeader
        .split(';')
        .map(value => value.trim())
        .find(value => value.startsWith(`${sessionCookieName}=`));
    const secret = getSessionSecret();
    if (!cookie || !secret) return null;

    let token;
    try {
        token = decodeURIComponent(cookie.slice(sessionCookieName.length + 1));
    } catch {
        return null;
    }
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return null;

    const expected = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest();
    let actual;
    try {
        actual = Buffer.from(signature, 'base64url');
    } catch {
        return null;
    }
    if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null;

    try {
        const session = JSON.parse(Buffer.from(payload, 'base64url').toString());
        if (!Number.isInteger(session.userId) || session.expiresAt <= Date.now()) return null;
        return session.userId;
    } catch {
        return null;
    }
}

function setSessionCookie(req, res, userId) {
    const secure = req.secure || req.headers['x-forwarded-proto'] === 'https';
    res.cookie(sessionCookieName, createSession(userId), {
        httpOnly: true,
        secure,
        sameSite: 'lax',
        maxAge: sessionDurationSeconds * 1000,
        path: '/'
    });
}

function requireSession(req, res, next) {
    const userId = getSessionUserId(req);
    if (!userId) return res.status(401).json({ error: 'Inicia sesión para continuar' });

    db.query('SELECT id, correo FROM usuarios WHERE id = ?', [userId], (err, results) => {
        if (err) {
            logDatabaseError('Session validation', err);
            return res.status(500).json({ error: 'No se pudo validar la sesión' });
        }
        if (results.length === 0) return res.status(401).json({ error: 'La sesión ya no es válida' });
        req.user = results[0];
        next();
    });
}

function ensurePurchaseTable() {
    if (!purchaseTableReady) {
        const createTable = sql => new Promise((resolve, reject) => {
            db.query(sql, err => err ? reject(err) : resolve());
        });
        purchaseTableReady = Promise.all([
            createTable(`
                CREATE TABLE IF NOT EXISTS devbook_compras (
                    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    payment_id VARCHAR(64) NOT NULL,
                    product_id VARCHAR(100) NOT NULL,
                    amount DECIMAL(12, 2) NOT NULL,
                    currency CHAR(3) NOT NULL,
                    purchased_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE KEY unique_book_buyer (user_id),
                    UNIQUE KEY unique_payment (payment_id),
                    INDEX idx_product_id (product_id)
                )
            `),
            createTable(`
                CREATE TABLE IF NOT EXISTS devbook_checkout_intents (
                    external_reference CHAR(48) NOT NULL PRIMARY KEY,
                    user_id INT NOT NULL,
                    checkout_url VARCHAR(2048) NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE KEY unique_checkout_user (user_id)
                )
            `)
        ]).then(async () => {
            const columns = await new Promise((resolve, reject) => {
                db.query(
                    `SELECT COLUMN_NAME FROM information_schema.columns
                     WHERE table_schema = ? AND table_name = 'devbook_checkout_intents'`,
                    [process.env.DB_NAME],
                    (err, rows) => err ? reject(err) : resolve(rows.map(row => row.COLUMN_NAME))
                );
            });
            if (!columns.includes('checkout_url')) {
                await createTable('ALTER TABLE devbook_checkout_intents ADD COLUMN checkout_url VARCHAR(2048) NULL');
            }

            const indexes = await new Promise((resolve, reject) => {
                db.query(
                    `SELECT INDEX_NAME FROM information_schema.statistics
                     WHERE table_schema = ? AND table_name = 'devbook_checkout_intents'`,
                    [process.env.DB_NAME],
                    (err, rows) => err ? reject(err) : resolve(rows.map(row => row.INDEX_NAME))
                );
            });
            if (!indexes.includes('unique_checkout_user')) {
                await createTable('ALTER TABLE devbook_checkout_intents ADD UNIQUE KEY unique_checkout_user (user_id)');
            }
        }).catch(error => {
            purchaseTableReady = null;
            throw error;
        });
    }
    return purchaseTableReady;
}

function getMercadoPagoToken(res) {
    if (process.env.MP_ACCESS_TOKEN) return process.env.MP_ACCESS_TOKEN;
    res.status(503).json({
        error: 'Configura MP_ACCESS_TOKEN con el token de vendedor de Mercado Pago para habilitar pagos.'
    });
    return null;
}

async function mercadoPagoRequest(path, accessToken, options = {}) {
    const response = await fetch(`https://api.mercadopago.com${path}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) {
        const error = new Error('Mercado Pago rechazó la solicitud');
        error.status = response.status;
        error.providerCode = body && (body.error || body.message);
        throw error;
    }
    if (!body) throw new Error('Mercado Pago devolvió una respuesta no válida');
    return body;
}

async function saveApprovedPurchase(userId, paymentId, accessToken) {
    await ensurePurchaseTable();
    const payment = await mercadoPagoRequest(`/v1/payments/${encodeURIComponent(paymentId)}`, accessToken);
    const intent = await new Promise((resolve, reject) => {
        db.query(
            'SELECT user_id FROM devbook_checkout_intents WHERE external_reference = ?',
            [String(payment.external_reference || '')],
            (err, rows) => err ? reject(err) : resolve(rows[0] || null)
        );
    });
    if (!intent || String(intent.user_id) !== String(userId)) {
        return { error: 'Este pago no corresponde a la cuenta que inició la compra.', status: 403 };
    }
    if (payment.status !== 'approved') {
        return { status: payment.status || 'pending' };
    }
    if (payment.currency_id !== product.currency || Number(payment.transaction_amount) !== product.price) {
        return { error: 'El pago no coincide con el precio y la moneda del producto.', status: 409 };
    }

    await new Promise((resolve, reject) => {
        db.query(
            `INSERT IGNORE INTO devbook_compras
                (user_id, payment_id, product_id, amount, currency)
             VALUES (?, ?, ?, ?, ?)`,
            [userId, String(payment.id), product.id, product.price, product.currency],
            err => err ? reject(err) : resolve()
        );
    });

    const purchase = await new Promise((resolve, reject) => {
        db.query(
            'SELECT payment_id FROM devbook_compras WHERE user_id = ? AND product_id = ?',
            [userId, product.id],
            (err, rows) => err ? reject(err) : resolve(rows[0] || null)
        );
    });
    if (!purchase) return { error: 'Este pago ya está asociado a otra cuenta.', status: 409 };
    return { status: 'approved' };
}

app.post('/api/register', async (req, res) => {
    const { nombre, correo, password } = req.body || {};
    if (typeof correo !== 'string' || typeof password !== 'string' || !correo || !password) {
        return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }
    const displayName = typeof nombre === 'string' && nombre.trim()
        ? nombre.trim()
        : correo.split('@')[0];
    if (correo.length > 100 || displayName.length > 100 || password.length < 6 || Buffer.byteLength(password, 'utf8') > 72) {
        return res.status(400).json({ error: 'Revisa el correo, nombre y longitud de la contraseña' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)';
        db.query(sql, [displayName, correo, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'El correo ya está registrado' });
                }
                logDatabaseError('Registration', err);
                return res.status(500).json({ error: 'Error en la base de datos' });
            }
            res.json({ message: 'Usuario registrado exitosamente' });
        });
    } catch (e) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

app.post('/api/login', (req, res) => {
    const { correo, password } = req.body || {};
    if (typeof correo !== 'string' || typeof password !== 'string' || !correo || !password) {
        return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }
    const missingDatabaseSettings = getMissingDatabaseSettings();
    if (missingDatabaseSettings.length > 0) {
        console.error('Login database configuration is incomplete:', {
            missing: missingDatabaseSettings,
            environment: process.env.VERCEL ? 'vercel' : 'local'
        });
        return res.status(503).json({
            error: 'La base de datos no está configurada. Revisa las variables DB_HOST, DB_PORT, DB_USER, DB_PASSWORD y DB_NAME del entorno.'
        });
    }

    const sql = 'SELECT * FROM usuarios WHERE correo = ?';
    db.query(sql, [correo], async (err, results) => {
        if (err) {
            logDatabaseError('Login', err);
            return res.status(500).json({
                error: 'No se pudo conectar con la base de datos. Verifica que MySQL sea accesible desde Vercel y que las credenciales y permisos estén vigentes.'
            });
        }
        if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const user = results[0];
        let isMatch = await bcrypt.compare(password, user.password).catch(() => false);
        if (!isMatch && user.password === password) {
            try {
                const migratedPassword = await bcrypt.hash(password, 10);
                const updated = await new Promise((resolve, reject) => {
                    db.query(
                        'UPDATE usuarios SET password = ? WHERE id = ? AND password = ?',
                        [migratedPassword, user.id, user.password],
                        (updateError, result) => updateError ? reject(updateError) : resolve(result.affectedRows > 0)
                    );
                });
                if (updated) {
                    isMatch = true;
                } else {
                    const currentUser = await new Promise((resolve, reject) => {
                        db.query('SELECT password FROM usuarios WHERE id = ?', [user.id], (queryError, rows) => {
                            if (queryError) return reject(queryError);
                            resolve(rows[0] || null);
                        });
                    });
                    isMatch = currentUser
                        ? await bcrypt.compare(password, currentUser.password).catch(() => false)
                        : false;
                }
            } catch (error) {
                console.error('Password migration failed:', error.code || error.message);
                return res.status(500).json({ error: 'No se pudo validar la contraseña' });
            }
        }
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        try {
            setSessionCookie(req, res, user.id);
        } catch (error) {
            console.error(error.message);
            return res.status(503).json({ error: 'Configura SESSION_SECRET para habilitar sesiones seguras.' });
        }
        res.json({ message: 'Login exitoso', user: { id: user.id, correo: user.correo } });
    });
});

app.get('/api/session', requireSession, (req, res) => {
    res.json({ user: req.user });
});

app.post('/api/logout', (req, res) => {
    res.clearCookie(sessionCookieName, {
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite: 'lax',
        path: '/'
    });
    res.json({ message: 'Sesión cerrada' });
});

app.get('/api/book/status', requireSession, async (req, res) => {
    try {
        await ensurePurchaseTable();
        db.query(
            'SELECT purchased_at FROM devbook_compras WHERE user_id = ? AND product_id = ?',
            [req.user.id, product.id],
            (err, rows) => {
                if (err) return res.status(500).json({ error: 'No se pudo consultar la compra' });
                res.json({
                    product: { title: product.title, price: product.price, currency: product.currency },
                    purchased: rows.length > 0,
                    sandbox: process.env.MP_USE_SANDBOX !== 'false'
                });
            }
        );
    } catch (error) {
        console.error('Purchase table initialization failed:', error.code || error.message);
        res.status(500).json({ error: 'No se pudo preparar la información de compra' });
    }
});

app.post('/api/book/checkout', requireSession, async (req, res) => {
    const accessToken = getMercadoPagoToken(res);
    if (!accessToken) return;
    try {
        await ensurePurchaseTable();
        const existingPurchase = await new Promise((resolve, reject) => {
            db.query(
                'SELECT id FROM devbook_compras WHERE user_id = ? AND product_id = ?',
                [req.user.id, product.id],
                (err, rows) => err ? reject(err) : resolve(rows[0] || null)
            );
        });
        if (existingPurchase) {
            return res.status(409).json({ error: 'Este producto ya está asociado a tu cuenta.' });
        }

        const existingIntent = await new Promise((resolve, reject) => {
            db.query(
                'SELECT external_reference, checkout_url FROM devbook_checkout_intents WHERE user_id = ?',
                [req.user.id],
                (err, rows) => err ? reject(err) : resolve(rows[0] || null)
            );
        });
        if (existingIntent && existingIntent.checkout_url) {
            return res.json({ checkoutUrl: existingIntent.checkout_url });
        }

        const externalReference = existingIntent
            ? existingIntent.external_reference
            : crypto.randomBytes(24).toString('hex');
        const appBaseUrl = new URL(process.env.APP_BASE_URL || 'http://localhost:8085').origin;
        const preference = await mercadoPagoRequest('/checkout/preferences', accessToken, {
            method: 'POST',
            body: JSON.stringify({
                items: [{
                    id: product.id,
                    title: product.title,
                    quantity: 1,
                    currency_id: product.currency,
                    unit_price: product.price
                }],
                external_reference: externalReference,
                back_urls: {
                    success: `${appBaseUrl}/payment-result.html`,
                    failure: `${appBaseUrl}/payment-result.html`,
                    pending: `${appBaseUrl}/payment-result.html`
                },
                auto_return: 'approved'
            })
        });
        const checkoutUrl = process.env.MP_USE_SANDBOX !== 'false'
            ? preference.sandbox_init_point
            : preference.init_point;
        if (!checkoutUrl) {
            console.error('Mercado Pago preference response omitted checkout URL');
            return res.status(502).json({ error: 'Mercado Pago no devolvió el enlace de pago.' });
        }
        if (existingIntent) {
            await new Promise((resolve, reject) => {
                db.query(
                    'UPDATE devbook_checkout_intents SET checkout_url = ? WHERE user_id = ?',
                    [checkoutUrl, req.user.id],
                    err => err ? reject(err) : resolve()
                );
            });
        } else {
            await new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO devbook_checkout_intents (external_reference, user_id, checkout_url) VALUES (?, ?, ?)',
                    [externalReference, req.user.id, checkoutUrl],
                    err => err ? reject(err) : resolve()
                );
            });
        }
        res.json({ checkoutUrl });
    } catch (error) {
        console.error('Checkout creation failed:', error.status || error.message, error.providerCode || '');
        res.status(502).json({
            error: 'No se pudo iniciar el checkout. Revisa las credenciales y la configuración de Mercado Pago.'
        });
    }
});

app.post('/api/book/confirm', requireSession, async (req, res) => {
    const accessToken = getMercadoPagoToken(res);
    if (!accessToken) return;
    const paymentId = String((req.body && req.body.payment_id) || '');
    if (!/^\d+$/.test(paymentId)) {
        return res.status(400).json({ error: 'El identificador de pago no es válido.' });
    }
    try {
        const result = await saveApprovedPurchase(req.user.id, paymentId, accessToken);
        if (result.error) return res.status(result.status).json({ error: result.error });
        res.json({
            status: result.status,
            purchased: result.status === 'approved'
        });
    } catch (error) {
        console.error('Payment verification failed:', error.status || error.message, error.providerCode || '');
        res.status(502).json({ error: 'No se pudo verificar el pago con Mercado Pago.' });
    }
});

app.get('/api/book/download', requireSession, async (req, res) => {
    try {
        await ensurePurchaseTable();
        db.query(
            'SELECT id FROM devbook_compras WHERE user_id = ? AND product_id = ?',
            [req.user.id, product.id],
            (err, rows) => {
                if (err) return res.status(500).json({ error: 'No se pudo validar el acceso al PDF' });
                if (rows.length === 0) {
                    return res.status(403).json({ error: 'Completa la compra para descargar el PDF.' });
                }

                const document = new PDFDocument({ size: 'A4', margins: { top: 72, bottom: 64, left: 64, right: 64 }, bufferPages: true });
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename="guia-analisis-desarrollo-software.pdf"');
                document.pipe(res);
                renderEbook(document);
            }
        );
    } catch (error) {
        console.error('PDF access failed:', error.code || error.message);
        res.status(500).json({ error: 'No se pudo preparar la descarga del PDF.' });
    }
});

app.get('/', (req, res) => {
    res.send('✅ DevBook Backend funcionando');
});

app.use((error, req, res, next) => {
    if (error.type !== 'entity.parse.failed') return next(error);
    console.warn('Invalid JSON request body:', req.method, req.originalUrl);
    res.status(400).json({ error: 'El cuerpo de la solicitud debe contener JSON válido.' });
});

module.exports = app;

if (require.main === module) {
    const port = Number(process.env.PORT || 5000);
    app.listen(port, () => {
        console.log(`Servidor Backend corriendo en el puerto ${port}`);
    });
}
