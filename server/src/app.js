import express from 'express';
import Knex from 'knex';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import promiseRouter from 'express-promise-router';
import { Model } from 'objection';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import knexSession from 'connect-session-knex';
import config from './utils/config';
import knexConfig from '../knexfile';
import errorHandler from './middlewares/errorHandling';
import apiController from './api';
import seed from './utils/seed';


// Connect to database.
/* eslint-disable-next-line import/prefer-default-export */
export const knex = Knex(knexConfig);
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
  .use(morgan(logFormat))
  .use(session({
    store: new (knexSession(session))({ knex }),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(router)
  .use(errorHandler);

// Register controllers providing API endpoints
apiController(router);

// Database seeding utility for development and testing.
if (process.env.NODE_ENV !== 'production') {
  seed(router);
}

// Serve static frontend.
app.use(express.static('public'));
app.get('*', (req, res) => res.sendFile(path.resolve('public', 'index.html')));

app.listen(config.port,
  /* eslint-disable-next-line no-console */
  () => console.log(`Vyardage server running in ${process.env.NODE_ENV} mode at port ${config.port}.`));
