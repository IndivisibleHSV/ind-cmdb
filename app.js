'use strict';
const http = require('http');
const config = require('config');
const log = require('./src/lib/log');
const bootstrap = require('./src/bootstrap');

bootstrap.boot().then(app => {
    http.createServer(app).listen(config.port, () => {
        log.info(`server listening on port ${config.port}`);
    });
}).catch(err => {
    process.nextTick(() => { throw err; });
});
