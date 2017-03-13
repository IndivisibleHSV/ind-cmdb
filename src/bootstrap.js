'use strict';
const config = require('config');
const cors = require('cors');
const express = require('express');
const swaggerTools = require('swagger-tools');
const passport = require('passport');
//const BasicStrategy = require('passport-http').BasicStrategy;
const bunyanMiddleware = require('bunyan-middleware');
const swaggerDefinition = require('./api.json'); // TODO: Replace with YAML, because YAML > JSON.
//const authVerify = require('./lib/middleware/authentication');
const log = require('./lib/log');

function boot() {
    return new Promise(resolve => {
        const app = express();

        app.set('x-powered-by', false);
        app.set('trust proxy', true);
        app.use(cors());
        app.use(bunyanMiddleware({
            logger: log,
            headerName: 'x-request-id',
            verbose: true,
            requestStart: true,
            level: 'debug'
        }));

        swaggerDefinition.host = config.swagger.host || swaggerDefinition.host;
        swaggerDefinition.schemes = [config.swagger.scheme];

        swaggerTools.initializeMiddleware(swaggerDefinition, middleware => {
            app.use(passport.initialize());

            // TODO: Replace with OAuth

            // configure basic auth
            //passport.use(new BasicStrategy(authVerify()));
            // exclude api-docs from auth check
            /*app.use(/^(?!\/api-docs.*)/, (req, res, next) => {
                passport.authenticate('basic', { session: false }, (err, user) => {
                    if (err || !user) {
                        // TODO: Replace Error with a more specific AuthError
                        next(err || new Error());
                        return;
                    }

                    // store the authenticated user on the request in READ ONLY JSON format
                    req.user = user.toJSON();
                    next();
                })(req, res, next);
            });
            */

            // configure swagger
            app.use(middleware.swaggerMetadata());
            app.use(middleware.swaggerValidator());
            app.use(middleware.swaggerRouter({
                controllers: './src/controllers',
                stubs: false
            }));
            app.use(middleware.swaggerUi());
            resolve(app);
        });
    });
}

module.exports = { boot };
