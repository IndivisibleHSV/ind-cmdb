'use strict';
const log = require('../log');
const db = require('../../db');
const User = db.model('User');

/**
 * Returns a function that can be used to verify authentication.
 *
 * @returns {function}
 */
function authVerify() {

    /**
     * Verification method that can be used with passport to authenticate a user.
     *
     * @param {string} username the username to authenticate
     * @param {string} password the password to authenticate
     * @param {function} done the callback that will be called after authentication
     */
    return function authVerifyMiddleware(username, password, done) {
        log.trace({
            username
        }, 'In basic auth verify');

        User.where({ username }).fetch().then(user => {
            if (!user) {
                log.debug({ username }, 'no user found');
                done(null, false);
                return;
            }

            return user.comparePassword(password).then(matches => {
                if (!matches) {
                    log.debug({ username }, 'password did not match');
                    done(null, false);
                    return;
                }

                log.debug({ username }, 'password matched');
                done(null, user);
            });
        }).catch(err => {
            log.error({ err, username }, 'error while authenticating user');
            done(err);
        });
    };
}

module.exports = authVerify;
