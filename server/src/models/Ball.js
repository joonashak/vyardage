import { Model } from 'objection';

export default class Ball extends Model {
  static tableName = 'Ball';

  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      distance: { type: 'number' },
      spin: { type: 'number' },
    },
    required: [
      'id',
      'name',
      'distance',
      'spin',
    ],
  };
}
