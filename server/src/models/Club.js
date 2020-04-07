import { Model } from 'objection';

export default class Club extends Model {
  static tableName = 'Club';

  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      clubType: {
        type: 'string',
        enum: [
          'Driver',
          '3-wood',
          'Hybrid',
          '3-iron',
          '4-iron',
          '5-iron',
          '6-iron',
          '7-iron',
          '8-iron',
          '9-iron',
          'Pitching wedge',
          'Gap wedge',
          'Sand wedge',
          'Lob wedge',
        ],
      },
    },
    required: [
      'id',
      'name',
      'distance',
      'spin',
    ],
  };
}
