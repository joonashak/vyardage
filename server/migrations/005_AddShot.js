/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema
    .createTable('Shot', (table) => {
      table.uuid('id').notNullable().primary();
      table
        .uuid('userId')
        .references('id')
        .inTable('User')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .notNullable();
      table
        .uuid('clubId')
        .references('id')
        .inTable('Club')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .notNullable();
      table
        .uuid('ballId')
        .references('id')
        .inTable('Ball')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .notNullable();
      table.enu('lieType', [
        'Tee',
        'Fairway',
        'Rough',
        'Sand',
      ], {
        useNative: true,
        enumName: 'LIE_TYPE',
      }).notNullable();
      table.float('liePct').notNullable();
      table.integer('windDir').notNullable();
      table.integer('windSpeed').notNullable();
      table.integer('elevation').notNullable();
      table.float('spin').notNullable();
      table.float('power').notNullable();
      table.integer('actCarry').notNullable();
      table.integer('predCarry');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Shot');
};
