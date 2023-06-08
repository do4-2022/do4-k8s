require('dotenv').config();
const redis = require('redis');
const { Client } = require('pg');

const REDIS_COUNTER_KEY = 'counter';

// Configuration des clients Redis et PostgreSQL
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});
const pgClient = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
});

// Connexion à PostgreSQL
pgClient.connect(err => {
    if (err) {
        console.error('Erreur de connexion à PostgreSQL:', err);
        process.exit(-1);
    }

    pgClient.query(`CREATE TABLE IF NOT EXISTS counter_table (counter_value INTEGER)`, (err) => {
        if (err) {
            console.error('Erreur lors de la création de la table:', err);
            process.exit(-1);
        }

        // Récupération de la valeur du compteur dans Redis
        redisClient.get(REDIS_COUNTER_KEY, (err, counterValue) => {
            if (err) {
                console.error('Erreur lors de la récupération du compteur:', err);
                process.exit(-1);
            }

            // Écriture de la valeur du compteur dans PostgreSQL
            pgClient.query('INSERT INTO counter_table (counter_value) VALUES ($1)', [counterValue], (err) => {
                if (err) {
                    console.error('Erreur lors de l\'écriture dans PostgreSQL:', err);
                    process.exit(-1);
                }

                console.log('Valeur du compteur écrite avec succès dans PostgreSQL.');
                process.exit(0);
            });
        });
    });
});
