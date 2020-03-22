module.exports = {
  client: 'pg',
  connection: process.env.NODE_ENV === 'production' ? `${process.env.DATABASE_URL}?ssl=true` : process.env.DATABASE_URL,
  debug: process.env.NODE_ENV !== 'production',
};
