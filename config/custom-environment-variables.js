'use strict';

module.exports = {
    port: 'PORT',
    environment: 'NODE_ENV',
    swagger: {
        host: 'SWAGGER_HOST',
        scheme: 'SWAGGER_SCHEME'
    },
    knex: {
        connection: {
            host: 'MYSQL_HOST',
            user: 'MYSQL_USER',
            password: 'MYSQL_PASSWORD',
            database: 'MYSQL_DATABASE'
        },
        debug: 'KNEX_DEBUG'
    },
    log: {
        level: 'LOG_LEVEL'
    }
};
