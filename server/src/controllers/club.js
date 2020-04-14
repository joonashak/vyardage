import Club from '../models/Club';
import { auth, authAdmin } from '../middlewares/authentication';
import addId from '../utils/addId';
import { knex } from '../app';


export default (router) => {
  /**
   * Get all clubs.
   */
  router.get('/api/v1/clubs', auth, async (req, res) => {
    res.send(await Club.query());
  });

  /**
   * Create new club.
   */
  router.post('/api/v1/club', authAdmin, async (req, res) => {
    const data = addId(req);
    res.send(await Club.query().insert(data).returning('*'));
  });

  /**
   * Get all possible club types (i.e., CLUB_TYPE enumeration).
   */
  router.get('/api/v1/clubTypes', auth, async (req, res) => {
    const clubTypes = await knex.raw('SELECT unnest(enum_range(NULL::"CLUB_TYPE")) AS "clubType"');
    res.send(clubTypes.rows.map((row) => row.clubType));
  });
};
