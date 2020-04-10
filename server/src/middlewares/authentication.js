import csurf from 'csurf';
import User from '../models/User';
import { PrivateRouteError, ForbiddenError } from '../utils/customErrors';


const csrfProtection = (req, res, next) => {
  // Ease work by skipping CSRF protection in development.
  if (process.env.NODE_ENV === 'development') {
    next();
    return;
  }

  const csrf = csurf({ cookie: true, ignoreMethods: [] });
  csrf(req, res, next);
};

/**
 * Authenticated route middleware.
 * CSRF protection is enabled for all HTTP verbs.
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {function} next Express next() method.
 */
export const auth = async (req, res, next) => {
  const { uid } = req.session;

  try {
    const user = await User.query().findById(uid);
    req.session.isAdmin = user.isAdmin;
  } catch (err) {
    console.log(req.session);
    throw new PrivateRouteError();
  }

  csrfProtection(req, res, next);
};

/**
 * Admin-only route middleware.
 * CSRF protection is enabled for all HTTP verbs.
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {function} next Express next() method.
 */
export const authAdmin = async (req, res, next) => {
  const { uid } = req.session;
  let user;

  try {
    user = await User.query().findById(uid);
    req.session.isAdmin = user.isAdmin;
  } catch {
    throw new PrivateRouteError();
  }

  if (!user.isAdmin) {
    throw new ForbiddenError('Admin role required.');
  }

  csrfProtection(req, res, next);
};
