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
    res.status(201).send(await Ball.query().insert(data).returning('*'));
  });

  /**
   * Update a ball.
   */
  router.put('/api/v1/ball', authAdmin, async (req, res) => {
    const data = req.body;
    const updatedRows = await Ball.query().update(data).where('id', data.id).returning('*');
    res.send(updatedRows[0]);
  });

  /**
   * Delete a ball.
   */
  router.delete('/api/v1/ball', authAdmin, async (req, res) => {
    const { id } = req.body;
    const rows = await Ball.query().deleteById(id);
    res.sendStatus(rows === 0 ? 404 : 200);
  });
};
