const express = require('express');
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

router.get('/seguro', async (req, res) => {
    try {
        const result = await dbClient.query('SELECT * FROM users_seguro');
        const users = result.rows;

        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/inseguro', async (req, res) => {
    try {
        // Verificar si la tabla 'users_inseguro' existe en el esquema 'public'
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = 'users_inseguro'
                AND table_schema = 'public'
            )
        `;

        const result = await dbClient.query(checkTableQuery);
        const tableExists = result.rows[0].exists;

        if (tableExists) {
            // La tabla existe, se puede ejecutar la consulta SELECT
            const selectQuery = 'SELECT * FROM users_inseguro';
            const selectResult = await dbClient.query(selectQuery);
            const users = selectResult.rows;

            res.json(users);
        } else {
            // La tabla no existe
            res.status(404).json({ message: 'Table users_inseguro does not exist' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/crear_tabla', async (req, res) => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users_inseguro (
                id serial PRIMARY KEY,
                username VARCHAR (100) NOT NULL,
                email VARCHAR (100) NOT NULL,
                password VARCHAR (100) NOT NULL
            )
        `;

        await dbClient.query(createTableQuery);
        res.json({ message: 'Tabla creada con éxito' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


process.on('SIGINT', () => {
    dbClient.end();
    process.exit();
});

module.exports = router;