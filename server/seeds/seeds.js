/* eslint-disable import/prefer-default-export */
import clubs from '../data/clubs';

export const seed = async (knex) => {
  await knex('Club').del();
  await knex('Club').insert(clubs);
};
