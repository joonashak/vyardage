import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { ForbiddenError } from '../utils/customErrors';


/*
 * WARNING:
 * The field `passwordHash` is NOT removed at ORM-level. It should NEVER BE EXPOSED.
 */
const safeFields = (user) => {
  const { passwordHash, ...rest } = user;
  return rest;
};

const createUser = async (data) => {
  const { username, password, isAdmin } = data;

  const user = await User.query().insert({
    id: uuid(),
    passwordHash: await bcrypt.hash(password, 12),
    username,
    isAdmin,
    createdAt: 'NOW()',
  }).returning('*');

  return safeFields(user);
};

export default (router) => {
  /**
   * Create an account with admin privileges. Can only be used if the user table
   * is empty.
   */
  router.post('/api/v1/initialUser', async (req, res) => {
    const rows = await User.query().count('*');

    if (rows[0].count !== '0') {
      throw new ForbiddenError('User table is already populated.');
    }

    const data = req.body;
    data.isAdmin = true;
    const user = await createUser(data);
    res.send(user);
  });
};
