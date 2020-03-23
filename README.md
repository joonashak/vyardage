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

## Usage

### Development

The development environment is composed of the server and the database running in Docker containers and the frontend being served by React's development server. While slightly inconvenient, I find this setup reducing a lot of somewhat hacky configuration.

First start the backend:

```bash
npm run dev
```

Followed with the frontend:

```bash
cd client
npm start
```

To run migrations, make sure the backend is down (use `docker-compose down` if necessary) and then command:

```bash
npm run dev:migrate
```

### Testing

Tests are automatically run by CI on deploy.

To run tests locally (requires docker):

```bash
npm test
```

### Configuration

Configuration is loaded with `rc` which means you can override any configuration variables by defining them in `server/.vyardagerc`. However, if you use the npm/docker commands outlined in this document, all necessary variables will be set for you when running in either development or testing mode.

#### Production Configuration

This app is designed to be run on Heroku. Since Heroku does not install development dependencies for building, `npm` must be directed not to run in production mode, otherwise the correct version of `@babel/cli` cannot be installed (`npx` uses an outdated version). Set the following environment variable in Heroku:

```bash
NPM_CONFIG_PRODUCTION=false
```

Other environment variables that are necessary for running in production are outlined in the table below.

Name|Definition
-|-
DATABASE_URL|Postgres connection string for database connection.
SESSION_SECRET|Salt for hashing passwords.
