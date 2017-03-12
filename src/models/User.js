'use strict';
const Bcrypt = require('bcrypt');
const Joi = require('joi');
const BaseModel = require('./helpers/base');
const required = { is: true, then: Joi.required() };

const UserModel = BaseModel.extend({
    tableName: 'users',
    hidden: ['password'],
    hasTimestamps: ['createdAt', 'updatedAt'],
    schema: {
        id: Joi.string().when('$creating', required),
        username: Joi.string().when('$creating', required),
        email: Joi.string().when('$creating', required),
        password: Joi.string().when('$creating', required),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
    },

    /* instance properties */
    initialize() {
        BaseModel.prototype.initialize.call(this);
        this.on('saving', this.hashPassword);
    },

    /**
     * Hashes the current password and stores it in the model password property.
     *
     * @returns {Promise}
     */
    hashPassword() {
        const currentPassword = this.attributes.password;
        const previousPassword = this.previousAttributes().password;

        // do not hash if the password has not changed or if no password was provided
        if (!currentPassword || currentPassword === previousPassword) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const clear = this.get('password');
            Bcrypt.hash(clear, 10, (err, hash) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(hash);
            });
        }).then(hash => {
            this.set('password', hash);
        });
    },

    /**
     * Returns true if the given password matches the hashed password in the password property.
     *
     * @param password
     * @returns {Promise.<boolean>}
     */
    comparePassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.compare(password, this.get('password'), (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (res) {
                    resolve(true);
                    return;
                }

                resolve(false);
            });
        });
    }
}, {
    /* collection properties */
});

module.exports = UserModel;
