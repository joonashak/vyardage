import Club from '../models/Club';
import { auth, authAdmin } from '../middlewares/authentication';
import addId from '../utils/addId';


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
};
