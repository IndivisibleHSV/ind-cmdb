'use strict';

exports.up = knex => {
    return knex.schema.createTable('users', table => {
        table.string('id', 191).primary();
        table.string('username', 191).notNullable().unique();
        table.string('email', 191).notNullable();
        table.string('password', 60);
        table.dateTime('createdAt');
        table.dateTime('updatedAt');
    });
};

exports.down = knex => {
    return knex.schema.dropTable('users');
};

