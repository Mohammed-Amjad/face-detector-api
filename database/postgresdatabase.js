const knex = require('knex');

const pgDatabase = knex({
    client: 'pg',
    // connecting in heroko
    // connection: {
    //     connectionString: process.env.DATABASE_URL,
    //     ssl: {
    //         rejectUnauthorized: false
    //     }
    // }
    // connecting in dev env
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'test'
    }
});

module.exports = pgDatabase;