import Ball from '../models/Ball';
import { auth } from '../middlewares/authentication';


export default (router) => {
  /**
   * Get all balls.
   */
  router.get('/api/v1/balls', auth, async (req, res) => {
    res.send(await Ball.query());
  });
};
