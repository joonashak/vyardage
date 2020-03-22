const connection = process.env.DATABASE_URL;
connection.concat(process.env.NODE_ENV === 'production' ? '?ssl=open' : '');
console.log(process.env.NODE_ENV);
console.log('connection string:', connection);

module.exports = {
  client: 'pg',
  connection,
  debug: process.env.NODE_ENV !== 'production',
};
