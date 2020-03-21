import { Model } from 'objection';


export default class User extends Model {
  static tableName = 'User';

  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      username: { type: 'string' },
      isAdmin: { type: 'boolean' },
      passwordHash: { type: 'string' },
      createdAt: { type: 'string' },
    },
    required: [
      'id',
      'username',
      'passwordHash',
      'isAdmin',
      'createdAt',
    ],
  };
}
