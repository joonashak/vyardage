import Club from '../models/Club';
import { auth } from '../middlewares/authentication';


export default (router) => {
  /**
   * Get all clubs.
   */
  router.get('/api/v1/clubs', auth, async (req, res) => {
    res.send(await Club.query());
  });
};
