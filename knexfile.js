'use strict';
const config = require('config');

module.exports = {
    test: config.knex,
    development: config.knex,
    production: config.knex
};
