/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema.table('User', (table) => table.unique('username'));
};

exports.down = function (knex) {
  return knex.schema.table('User', (table) => table.dropUnique('username'));
};
