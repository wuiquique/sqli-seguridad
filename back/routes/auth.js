const express = require('express');
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const router = express.Router();

const dbClient = new Client({
    user: 'admin',
    password: 'admin',
    host: 'postgres',
    database: 'sqli',
    port: 5432,
});

dbClient.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database. Admin privileges');
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
    });

const userData = [
    { name: 'Luis', email: 'luis@dummy.com', password: '12345' },
    { name: 'María', email: 'maria@dummy.com', password: '67890' },
    { name: 'Jose', email: 'jose@dummy.com', password: 'asdfg' },
    { name: 'Diego', email: 'diego@dummy.com', password: 'lkjhg' },
    { name: 'Juan', email: 'juan@dummy.com', password: 'poiuy' },
];

const saltRounds = 10;
router.post('/poblar/seguro', async (req, res) => {
    try {
        for (const user of userData) {
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);

            await dbClient.query(
                'INSERT INTO users_seguro(username, email, password) VALUES ($1, $2, $3)',
                [user.name, user.email, hashedPassword]
            );
        }

        const result = await dbClient.query('SELECT * FROM users_seguro');
        const users = result.rows;

        res.json(users);
    } catch (error) {
        console.error('Error during data population:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/poblar/inseguro', async (req, res) => {
    try {
        for (const user of userData) {
            await dbClient.query(
                'INSERT INTO users_inseguro(username, email, password) VALUES ($1, $2, $3)',
                [user.name, user.email, user.password]
            );
        }

        const result = await dbClient.query('SELECT * FROM users_inseguro');
        const users = result.rows;

        res.json(users);
    } catch (error) {
        console.error('Error during data population:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/inseguro', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = `SELECT * FROM users_inseguro WHERE email = '${email}' AND password = '${password}'`;
        const result = await dbClient.query(query);

        if (result.rows.length > 0) {
            res.json({ message: 'Login successful!' });
        } else {
            res.json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

process.on('SIGINT', () => {
    dbClient.end();
    process.exit();
});

module.exports = router;
