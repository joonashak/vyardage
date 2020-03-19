# Vyardage

Vyardage is a virtual golf yardage book. It is designed for use with the [World Golf Tour](https://www.wgt.com/) game. As you play the game, you enter your shot parameters and the results to Vyardage which then learns how different conditions affect the ball flight and helps you pick the best shot for a given situation.

## Usage

### Production Configuration

This app is designed to be run on Heroku. Since Heroku does not install development dependencies for building, `npm` must be directed not to run in production mode, otherwise the correct version of `@babel/cli` cannot be installed (`npx` uses an outdated version). Set the following environment variable in Heroku:

```bash
NPM_CONFIG_PRODUCTION=false
```

### Testing

Tests are automatically run by CI on deploy. Use Docker to run tests locally:

```bash
docker-compose run tests
```
