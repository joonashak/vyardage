import express from 'express';
import Knex from 'knex';
import config from './utils/config';


// Connect to database.
export const knex = Knex({
  client: 'pg',
  connection: config.databaseUrl,
  debug: process.env.NODE_ENV === 'development',
});

// FIXME: remove this later on
// Test connection
knex.raw('select 1').then(() => console.log('db working')).catch(() => throw new Error('failed db connection'));

const app = express();

app.use(express.static('public'));
app.get('*', (req, res) => res.sendFile(path.resolve('public', 'index.html')));

app.listen(config.port,
  () => console.log(`Vyardage server running in ${process.env.NODE_ENV} mode at port ${config.port}.`));


