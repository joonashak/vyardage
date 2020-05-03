import Ball from '../models/Ball';
import { auth, authAdmin } from '../middlewares/authentication';
import addId from '../utils/addId';


export default (router) => {
  /**
   * Get all balls.
   */
  router.get('/api/v1/balls', auth, async (req, res) => {
    res.send(await Ball.query());
  });

  /**
   * Create new ball.
   */
  router.post('/api/v1/ball', authAdmin, async (req, res) => {
    const data = addId(req);
    res.send(await Ball.query().insert(data).returning('*'));
  });

  /**
   * Update a ball.
   */
  router.put('/api/v1/ball', authAdmin, async (req, res) => {
    const data = req.body;
    res.send(await Ball.query().update(data).where('id', data.id).returning('*'));
  });
};
