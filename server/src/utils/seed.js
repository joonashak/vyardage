import Knex from 'knex';
import knexConfig from '../../knexfile';
import Shot from '../models/Shot';
import Club from '../models/Club';
import Ball from '../models/Ball';
import User from '../models/User';

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

  /**
   * Empty all rows from the database. Schema is preserved.
   */
  router.get('/reset', async (req, res) => {
    await Shot.query().delete();
    await Club.query().delete();
    await Ball.query().delete();
    await User.query().delete();

    res.send('Database reset.');
  });
};
