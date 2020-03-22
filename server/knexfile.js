const connection = process.env.DATABASE_URL;
connection.concat(process.env.NODE_ENV === 'production' ? '?ssl=open' : '');

module.exports = {
  client: 'pg',
  connection,
  debug: process.env.NODE_ENV !== 'production',
};
