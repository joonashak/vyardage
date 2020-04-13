import { auth } from '../middlewares/authentication';
import addId from '../utils/addId';
import Shot from '../models/Shot';


export default (router) => {
  /**
   * Create new shot.
   */
  router.post('/api/v1/shot', auth, async (req, res) => {
    const data = addId(req);
    data.userId = req.session.uid;
    delete data.createdAt; // Let db use it's default now().
    res.send(await Shot.query().insert(data).returning('*'));
  });
};
