const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'devbook_user',
    password: process.env.DB_PASSWORD || 'devbook_password',
    database: process.env.DB_NAME || 'devbook_db'
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Campos requeridos' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
        db.query(sql, [email, hashedPassword], (err, result) => {
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
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Campos requeridos' });

    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
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

        res.json({ message: 'Login exitoso', user: { id: user.id, email: user.email } });
    });
});

app.listen(3000, () => {
    console.log('Servidor Backend corriendo en el puerto 3000');
});
