import bcrypt from 'bcrypt';
import csrf from 'csurf';
import User from '../models/User';
import { LoginError, ConfigError } from '../utils/customErrors';
import config from '../utils/config';
import { auth } from '../middlewares/authentication';


export default (router) => {
  router.post('/api/v1/login', csrf({ cookie: true, ignoreMethods: ['POST'] }), async (req, res) => {
    const { username, password } = req.body;

    // Make sure salt is configured!
    if (!config.sessionSecret) {
      throw new ConfigError('Login is disabled because sessionSecret is not configured.');
    }

    // Fail on empty credentials.
    if (!username) {
      throw new LoginError(400, 'Empty username is not allowed.');
    } else if (!password) {
      throw new LoginError(400, 'Empty password is not allowed.');
    }

    const user = await User
      .query()
      .where('username', username)
      .first();

    // Database does not have trust - check username again.
    if (!user || user.username !== username) {
      throw new LoginError(401, 'Incorrect username.');
    }

    if (!await bcrypt.compare(password, user.passwordHash)) {
      throw new LoginError(401, 'Incorrect password.');
    }

    // express-session starts a new session when any attribute is set:
    req.session.uid = user.id;

    // Persistent login.
    if (req.body.remember === '1') {
      req.session.cookie.maxAge = config.loginDuration;
    }

    // Generate CSRF token and send it via a cookie.
    res.cookie('XSRF-Token', req.csrfToken());

    res.send({ message: 'Login successful.' });
  });

  /**
   * Log out the current user.
   */
  router.get('/api/v1/logout', async (req, res) => {
    req.session.destroy();
    res.send({ message: 'Logged out.' });
  });

  /**
   * Check for valid session.
   */
  router.get('/api/v1/checkSession', auth, (req, res) => {
    res.send({ message: 'Session is valid.' });
  });
};
