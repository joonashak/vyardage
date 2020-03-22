import express from 'express';
import Knex from 'knex';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import promiseRouter from 'express-promise-router';
import { Model } from 'objection';
import config from './utils/config';


// Connect to database.
const knex = Knex();

Model.knex(knex);

const app = express();

// CORS for development.
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ credentials: true, origin: config.frontendUrl }));
}

// Middleware configuration.
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
const router = promiseRouter();

app
  .use(bodyParser.json())
  .use(morgan(logFormat))
  .use(router);

// Serve static frontend.
app.use(express.static('public'));
app.get('*', (req, res) => res.sendFile(path.resolve('public', 'index.html')));

app.listen(config.port,
  () => console.log(`Vyardage server running in ${process.env.NODE_ENV} mode at port ${config.port}.`));
