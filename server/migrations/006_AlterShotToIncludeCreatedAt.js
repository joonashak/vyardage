/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema
    .table('Shot', (table) => {
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema.table('Shot', (table) => {
    table.dropColumn('createdAt');
  });
};
