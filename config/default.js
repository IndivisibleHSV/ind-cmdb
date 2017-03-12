'use strict';

module.exports = {
    port: 8000,
    environment: 'development',
    swagger: {
        host: 'localhost:8000',
        scheme: 'http'
    },
    knex: {
        debug: false,
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'indivisible',
            password: 'omgnotsecure',
            database: 'ind-cmdb',
            charset: 'utf8mb4'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations'
        }
    },
    log: {
        level: 'debug',
        logUncaughtException: true,
        pretty: true
    }
};
