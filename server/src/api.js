/**
 * Wrap active controllers together to make app.js cleaner.
 */
import login from './controllers/login';
import user from './controllers/user';
import ball from './controllers/ball';
import club from './controllers/club';
import shot from './controllers/shot';


export default (router, knex) => {
  login(router);
  user(router);
  ball(router);
  club(router, knex);
  shot(router);
};
