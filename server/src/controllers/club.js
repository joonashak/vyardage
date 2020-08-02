import Club from '../models/Club';
import { auth, authAdmin } from '../middlewares/authentication';
import addId from '../utils/addId';


export default (router, knex) => {
  const getClubTypes = async () => {
    const clubTypes = await knex.raw('SELECT unnest(enum_range(NULL::"CLUB_TYPE")) AS "clubType"');
    return clubTypes.rows.map((row) => row.clubType);
  };

  const generateIronSet = async (name) => {
    const clubTypes = await getClubTypes();
    const ironTypes = clubTypes.filter((type) => type.slice(-4) === 'iron');
    return ironTypes.map((clubType) => addId({ body: { name, clubType } }));
  };

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
    const data = req.body.clubType.slice(-4) === 'iron'
      ? await generateIronSet(req.body.name)
      : addId(req);
    res.send(await Club.query().insert(data).returning('*'));
  });

  /**
   * Update a club.
   */
  router.put('/api/v1/club', authAdmin, async (req, res) => {
    const data = req.body;

    const club = await Club.query().findById(data.id);
    if (!club) {
      return res.sendStatus(404);
    }

    // In case of irons, update the whole set.
    if (club.clubType.slice(-4) === 'iron') {
      const updatedRows = await Club.query()
        .patch({ name: data.name })
        .where({ name: club.name })
        .whereRaw('RIGHT("clubType"::text, 4) = \'iron\'')
        .returning('*');
      return res.send(updatedRows);
    }

    const updatedRows = await Club.query().update(data).where('id', data.id).returning('*');
    return res.send(updatedRows[0]);
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
    res.send(await getClubTypes());
  });
};
