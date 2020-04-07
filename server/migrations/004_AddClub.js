/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema
    .createTable('Club', (table) => {
      table.uuid('id').notNullable().primary();
      table.text('name').notNullable();
      table.enu('clubType', [
        'Driver',
        '3-wood',
        'Hybrid',
        '3-iron',
        '4-iron',
        '5-iron',
        '6-iron',
        '7-iron',
        '8-iron',
        '9-iron',
        'Pitching wedge',
        'Gap wedge',
        'Sand wedge',
        'Lob wedge',
      ], {
        useNative: true,
        enumName: 'CLUB_TYPE',
      }).notNullable();
      table.unique(['name', 'clubType']);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Club');
};
