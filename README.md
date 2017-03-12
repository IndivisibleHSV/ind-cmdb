# ind-cmdb

Indivisible Contact Management/Database.

Licensed under [Apache 2.0](LICENSE).

# Installation

It is assumed that you will be using Docker to install and manage ind-cmdb. A Makefile has been included to ease creation of the Docker container, as well as to push/pull it to the Docker registry.

## Docker Image Creation

` $ make `

## Docker Image Publishing

**NOTE:** As no tag has yet been created, this section is intentially left blank.

# Running

If running as a Docker container, use the standard Docker commands to start the container.

To run locally, use the included npm scripts:

` $ npm start `

# Configuration

All configuration is done using environment variables, which overrides the settings in `config`. The current supported environment variables are:

* `NODE_ENV` - The environment to run under. Default is `development`.
* `PORT` - The port to listen on. Default is `8000`.
* `SWAGGER_HOST` - The host Swagger should advertise. Default is `localhost`.
* `SWAGGER_SCHEME` - The scheme Swagger should advertise. Default is `http`.
* `MYSQL_HOST` - The host of our MYSQL database. Default is `localhost`.
* `MYSQL_USER` - The username for the MYSQL database.
* `MYSQL_PASSWORD` - The password for our MYSQL user.
* `MYSQL_DATABASE` - The database for this service.
* `KNEX_DEBUG` - Level of debug to use for the underlying KNEX DB driver. Default is not defined.
* `LOG_LEVEL` - Level of application logging. Default is `debug`.
