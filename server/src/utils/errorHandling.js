/**
 * Middleware to handle errors.
 * Designed to work with this module's CustomErrors and objection's errors.
 * The error object consumed by this middleware should include the fields statusCode
 * (HTTP status code), type (concise error type for UI logic) and message (human info).
 */
export default (error, request, response, next) => {
  if (!error) {
    next();
  }

  // Respond with error message, using defaults if necessary.
  const {
    statusCode = 500,
    type = 'UnknownError',
    message = 'An unknown error occured.',
    table,
    column,
    constraint,
  } = error;

  const data = {
    ...error.data,
    table,
    column,
    constraint,
  };

  response.status(statusCode).send({ message, type, data });
};
