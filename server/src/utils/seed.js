import Knex from 'knex';
import knexConfig from '../../knexfile';

export default (router) => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('This route should not be mounted in production!');
  }

  /**
   * Run Knex seed files.
   */
  router.get('/seed', async (req, res) => {
    const knex = Knex(knexConfig);
    res.send(await knex.seed.run());
  });
};
