#!/usr/bin/env node
'use strict';
const log = require('../src/lib/log');
const User = require('../src/db').model('User');
const config = require('config');

const env = config.environment;
const script = process.argv[1];
const username = process.argv[2];
const email = process.argv[3];

/**
 * Ensures all required arguments are present.
 */
function verifyArguments() {
    if (!username) {
        log.error('usage: npm run add-user username email');
        throw new Error('username is required');
    }

    if (!email) {
        log.error('usage: npm run add-user username email');
        throw new Error('email is required');
    }
}

log.info({ context: {
    env,
    script,
    username
} }, 'Running addAuthUser');

verifyArguments();

// save the user
User.forge({
    username,
    email
}).save().then(user => {
    log.info({ user }, 'Successfully created the user');
    process.exit(0);
}).catch(err => {
    log.error({ err }, 'Error creating the user');
    process.nextTick(() => {
        throw err;
    });
});
