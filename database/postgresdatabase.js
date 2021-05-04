const knex = require('knex');

const pgDatabase = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'test'
    }
});

module.exports = pgDatabase;