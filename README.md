# Vyardage

Vyardage is a virtual golf yardage book. It is designed for use with the [World Golf Tour](https://www.wgt.com/) game. As you play the game, you enter your shot parameters and the results to Vyardage which then learns how different conditions affect the ball flight and helps you pick the best shot for a given situation.

## Project Status

This app is currently under initial development.

Branch|CI Status
-|-
`master`|[![CircleCI](https://circleci.com/gh/joonashak/vyardage/tree/master.svg?style=svg)](https://app.circleci.com/pipelines/github/joonashak/vyardage?branch=master)
`trunk`|[![CircleCI](https://circleci.com/gh/joonashak/vyardage/tree/trunk.svg?style=svg)](https://app.circleci.com/pipelines/github/joonashak/vyardage?branch=trunk)

## Docs

- [Problem Description and Discussion](docs/Problem.md)
- [Database](docs/Database.md)
- [Tuntikirjanpito](docs/Tuntikirjanpito.md) (hour tracking, in Finnish)

API reference is provided in the `reference/` folder in OpenAPI 3 format. Use your tool of choice to view the file, I use [Stoplight](https://stoplight.io/).

## Usage

### Development

The development environment is composed of the server and the database running in Docker containers and the frontend being served by React's development server. While slightly inconvenient, I find this setup reducing a lot of somewhat hacky configuration.

First start the backend:

```bash
npm run dev
```

Followed with the frontend:

```bash
cd client/
npm start
```

### Database Migration

Migrations are not run automatically for the local development database. To run migrations, make sure the backend is down (use `docker-compose down` if necessary) and then command:

```bash
npm run dev:migrate
```

### Running Tests

Tests are automatically run by CI on deploy.

To run tests locally (requires docker):

```bash
npm test
```

### Writing Tests

The project contains a test development script which gives you an empty, fresh database on every launch. Migrations are also run automatically. You will need three terminal tabs for this setup.

Start the backend in test development mode:

```bash
npm run dev:test
```

Followed with the frontend:

```bash
cd client/
npm start
```

And finally launch the test suite:

```bash
npm run cypress:open
```

### Configuration

Configuration is loaded with `rc` which means you can override any configuration variables by defining them in `server/.vyardagerc`. However, if you use the npm/docker commands outlined in this document, all necessary variables will be set for you when running in either development or testing mode.

#### Environment variables

Name|Required|Definition
-|:-:|-
DATABASE_URL|✅|Postgres connection string for database connection.
SESSION_SECRET|✅|Salt for hashing passwords.
PORT||Port to listen to. Defaults to 3000.
FRONTEND_URL||Frontend URL. Used only in development mode to configure CORS. Defaults to `http://localhost:3000`

#### Creating Initial User

The database is not seeded for security. Instead, you need to create an initial admin user account by making a request to `/api/v1/initialUser`. The request payload should be a JSON object containing the keys `username` and `password`. The request will fail if the `User` table is not empty.

#### Production Configuration

This app is designed to be run on Heroku. Since Heroku does not install development dependencies for building, `npm` must be directed not to run in production mode, otherwise the correct version of `@babel/cli` cannot be installed (`npx` uses an outdated version). Set the following environment variable in Heroku:

```bash
NPM_CONFIG_PRODUCTION=false
```
