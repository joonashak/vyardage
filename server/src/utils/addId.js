import { v4 as uuid } from 'uuid';


/**
 * Add UUID to `req.body` if field `id` does not exist.
 * @param {object} req - Express request object.
 * @returns {object} Request data (body) with id field.
 */
export default (req) => (req.body.id ? req.body : { id: uuid(), ...req.body });
