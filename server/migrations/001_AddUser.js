/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .createTable('User', (table) => {
      table.uuid('id').notNullable().primary();
      table.text('username').notNullable();
      table.boolean('isAdmin').defaultTo(false);
      table.text('passwordHash').notNullable();
      table.timestamp('createdAt').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('User');
};
