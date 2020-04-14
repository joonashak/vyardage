/* eslint-disable import/prefer-default-export */
const clubs = require('../data/clubs');
const balls = require('../data/balls');

exports.seed = async (knex) => {
  await knex('Shot').del();
  await knex('Club').del();
  await knex('Ball').del();
  await knex('Club').insert(clubs);
  await knex('Ball').insert(balls);
};
