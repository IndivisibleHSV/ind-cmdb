#!/usr/bin/env node
'use strict';

const log = require('../src/lib/log');
const { cloneDeep } = require('lodash');
const knexFactory = require('knex');
const knexConfig = require('../knexfile');
const env = require('config').environment;

function assertDatabase() {
    const config = cloneDeep(knexConfig[env]);
    const databaseName = config.connection.database;
    delete config.connection.database;
    const knex = knexFactory(config);

    return knex.raw(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
}

function migrateDatabase() {
    const config = knexConfig[env];
    const knex = knexFactory(config);

    return knex.migrate.latest();
}

log.info('creating and/or migrating database');

assertDatabase()
    .then(migrateDatabase)
    .then(results => {
        const batchNo = results[0];
        const migrationLog = results[1];

        if (!migrationLog.length) {
            log.info('already up to date');
            return;
        }

        log.info({ batchNo, migrationLog }, 'database migration complete');
    })
    .then(() => process.exit(0))
    .catch(err => process.nextTick(() => { throw err; }));
