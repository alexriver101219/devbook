require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.post('/api/register', async (req, res) => {
    const { correo, password } = req.body;
    if (!correo || !password) return res.status(400).json({ error: 'Campos requeridos' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO usuarios (correo, password) VALUES (?, ?)';
        db.query(sql, [correo, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'El correo ya está registrado' });
                }
                return res.status(500).json({ error: 'Error en la base de datos' });
            }
            res.json({ message: 'Usuario registrado exitosamente' });
        });
    } catch (e) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

app.post('/api/login', (req, res) => {
    const { correo, password } = req.body;
    if (!correo || !password) return res.status(400).json({ error: 'Campos requeridos' });

    const sql = 'SELECT * FROM usuarios WHERE correo = ?';
    db.query(sql, [correo], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const user = results[0];
        let isMatch = await bcrypt.compare(password, user.password).catch(() => false);
        
        if (!isMatch && user.password === password) {
            isMatch = true;
        }

        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        res.json({ message: 'Login exitoso', user: { id: user.id, correo: user.correo } });
    });
});
app.get('/', (req, res) => {
    res.send('✅ DevBook Backend funcionando');
});

const port = Number(process.env.PORT || 5000);

app.listen(port, () => {
    console.log(`Servidor Backend corriendo en el puerto ${port}`);
});
