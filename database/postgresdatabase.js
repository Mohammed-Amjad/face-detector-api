const knex = require('knex');

const pgDatabase = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

module.exports = pgDatabase;