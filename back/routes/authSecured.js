const express = require('express');
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const router = express.Router();

const dbUser = new Client({
    user: 'client',
    password: 'client',
    host: 'postgres',
    database: 'sqli',
    port: 5432,
});

dbUser.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database. Client privileges');
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
    });

router.post('/seguro', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM users_seguro WHERE email = $1';
        const result = await dbUser.query(query, [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.json({ message: 'Login successful!' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

process.on('SIGINT', () => {
    dbUser.end();
    process.exit();
});

module.exports = router;