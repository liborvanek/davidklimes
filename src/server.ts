import { config as dotenvConfig } from 'dotenv-safe';

dotenvConfig();

import sirv from 'sirv';
import express from 'express';
import { json } from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import * as sapper from '@sapper/server';
import mongoose from 'mongoose';
import cron from 'node-cron';

import { rssFeed } from './server/rssFeed';
import { newsletterFromEcomail } from './server/newsletterFromEcomail';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

export const db = mongoose.connection;
const server = express();

// See https://evanhahn.com/gotchas-with-express-query-parsing-and-how-to-avoid-them/
server.set('query parser', (queryString) => {
  return new URLSearchParams(queryString);
});
server.use(
  helmet({
    contentSecurityPolicy: false,
  }),
  json(),
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware() as any,
);

db.once('open', () => {
  console.log('Connected to mongodb.');

  const listenCallback = () => {
    if (process.send) {
      process.send('online');
    }

    console.log(`> Ready on http://localhost:${PORT}`);
  };

  // Run rss sync every 10 minutes
  cron.schedule('*/10 * * * *', () => {
    rssFeed();
  });

  // on production we want to execute crons immediately
  // (dev can restart many times resulting in many unecessary calls)
  if (!dev) {
    rssFeed();
    newsletterFromEcomail();
  }

  server.listen(parseInt(PORT, 10), 'localhost', () => listenCallback);
}).on('error: ', (error) => {
  throw new Error(`Disconnected from mongodb. Reason: ${error}`);
});
