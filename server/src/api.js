/**
 * Wrap active controllers together to make app.js cleaner.
 */
import login from './controllers/login';
import user from './controllers/user';


export default (router) => {
  login(router);
  user(router);
};
