'use strict';
const err = require('./err');
const req = require('./req');
const bunyan = require('bunyan');

module.exports = {
    err,
    req,
    res: bunyan.stdSerializers.res
};
