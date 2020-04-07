import { Model } from 'objection';
import User from './User';
import Ball from './Ball';
import Club from './Club';


export default class Shot extends Model {
  static tableName = 'Shot';

  static jsonSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      userId: { type: 'string' },
      clubId: { type: 'string' },
      ballId: { type: 'string' },
      lieType: {
        type: 'string',
        enum: [
          'Tee',
          'Fairway',
          'Rough',
          'Sand',
        ],
      },
      liePct: { type: 'number', minimum: 0, maximum: 1 },
      windDir: { type: 'integer', minimum: 0, maximum: 359 },
      windSpeed: { type: 'integer', minimum: 0, maximum: 40 },
      elevation: { type: 'integer', minimum: -300, maximum: 300 },
      spin: { type: 'number', minimum: -1, maximum: 1 },
      power: { type: 'number', minimum: 0, maximum: 1 },
      actCarry: { type: 'integer', minimum: 0, maximum: 400 },
      predCarry: { type: 'integer' },
    },
    required: [
      'id',
      'userId',
      'clubId',
      'ballId',
      'lieType',
      'liePct',
      'windDir',
      'windSpeed',
      'elevation',
      'spin',
      'power',
      'actCarry',
    ],
  };

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'Shot.userId',
        to: 'User.id',
      },
    },
    ball: {
      relation: Model.BelongsToOneRelation,
      modelClass: Ball,
      join: {
        from: 'Shot.ballId',
        to: 'Ball.id',
      },
    },
    club: {
      relation: Model.BelongsToOneRelation,
      modelClass: Club,
      join: {
        from: 'Shot.clubId',
        to: 'Club.id',
      },
    },
  };
}
