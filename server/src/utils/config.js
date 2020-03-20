import rc from 'rc';

// Use .vyardagerc to set these variables in local development. Heroku will use process.env.
const defaultConfig = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.DATABASE_URL,
};

export default rc('vyardage', defaultConfig);
