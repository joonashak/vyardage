/**
 * Wrap active controllers together to make app.js cleaner.
 */
import login from './controllers/login';
import user from './controllers/user';
import ball from './controllers/ball';
import club from './controllers/club';


export default (router) => {
  login(router);
  user(router);
  ball(router);
  club(router);
};
