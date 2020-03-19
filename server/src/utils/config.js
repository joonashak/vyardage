import rc from 'rc';

// Use .vyardagerc to set these variables in local development. Heroku will use process.env.
const defaultConfig = {
  port: process.env.PORT || 3001,
};

export default rc('vyardage', defaultConfig);
