'use strict';
/*
 * This is the main entry point for interacting with the db.
 *
 * This file loads all of the bookshelf models from './models'
 * into the bookshelf model registry, preparing them for use.
 */
const models = require('./models');
const bookshelf = require('./lib/bookshelf');

Object.keys(models).forEach(key => {
    bookshelf.model(key, models[key]);
});

module.exports = bookshelf;
