/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema
    .createTable('Ball', (table) => {
      table.uuid('id').notNullable().primary();
      table.text('name').notNullable();
      table.float('distance').notNullable();
      table.float('spin').notNullable();
      table.unique('name');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Ball');
};
