/* eslint-disable max-classes-per-file */

class CustomError extends Error {
  constructor(type, statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.type = type;
    this.message = message;
  }
}

export class LoginError extends CustomError {
  constructor(statusCode, message) {
    super('LoginError', statusCode, message);
  }
}

export class ConfigError extends CustomError {
  constructor(message) {
    super('ConfigError', 500, message);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message) {
    super('ForbiddenError', 403, message);
  }
}
