/**
 * Wrap active controllers together to make app.js cleaner.
 */
import login from './controllers/login';


export default (router) => {
  login(router);
};
