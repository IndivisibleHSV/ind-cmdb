'use strict';
const Joi = require('joi');
const BaseModel = require('./helpers/base');
const required = { is: true, then: Joi.required() };

const ContactModel = BaseModel.extend({
    tableName: 'contacts',
    hasTimestamps: ['createdAt', 'updatedAt'],
    schema: {
        id: Joi.string().when('$creating', required),
        email: Joi.string().when('$creating', required),
        password: Joi.string().when('$creating', required),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
    },

    /* instance properties */
    initialize() {
        BaseModel.prototype.initialize.call(this);
        this.on('saving', this.hashPassword);
    }
}, {
    /* collection properties */
});

module.exports = ContactModel;
