import Club from '../models/Club';
import { auth, authAdmin } from '../middlewares/authentication';
import addId from '../utils/addId';


export default (router, knex) => {
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
   * Update a club.
   */
  router.put('/api/v1/club', authAdmin, async (req, res) => {
    const data = req.body;
    const updatedRows = await Club.query().update(data).where('id', data.id).returning('*');
    res.send(updatedRows[0]);
  });

  /**
   * Delete a club.
   */
  router.delete('/api/v1/club', authAdmin, async (req, res) => {
    const { id } = req.body;

    const club = await Club.query().findById(id);
    if (!club) {
      return res.sendStatus(404);
    }

    // In case of irons, delete the whole set.
    // This will delete no clubs if any club of the set has registered shots.
    if (club.clubType.slice(-4) === 'iron') {
      await Club.query().where({ club: club.name }).whereRaw('RIGHT("clubType"::text, 4) = \'iron\'').del();
    } else {
      await Club.query().deleteById(id);
    }

    return res.sendStatus(200);
  });

  /**
   * Get all possible club types (i.e., CLUB_TYPE enumeration).
   */
  router.get('/api/v1/clubTypes', auth, async (req, res) => {
    const clubTypes = await knex.raw('SELECT unnest(enum_range(NULL::"CLUB_TYPE")) AS "clubType"');
    res.send(clubTypes.rows.map((row) => row.clubType));
  });
};
