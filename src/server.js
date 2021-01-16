import { config as dotenvConfig } from 'dotenv-safe';
import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import mongoose from 'mongoose';

dotenvConfig();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

mongoose.connect(process.env.MONGO_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

export const db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to mongodb.');
}).on('error: ', (error) => {
	throw new Error(`Disconnected from mongodb. Reason: ${error}`);
});

const server = express();

server
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware(),
	)
	.listen(PORT, (error) => {
		if (error) {
			console.error('error', error);
		}
	});
