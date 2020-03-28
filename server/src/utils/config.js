import rc from 'rc';

// Use .vyardagerc to set these variables in local development. Heroku will use process.env.
const defaultConfig = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.DATABASE_URL,
  loginDuration: 30 * 24 * 60 * 60 * 1000, // 30 days
  sessionSecret: process.env.SESSION_SECRET,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};

export default rc('vyardage', defaultConfig);
