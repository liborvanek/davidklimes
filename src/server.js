import { config as dotenvConfig } from 'dotenv-safe';
import sirv from 'sirv';
import express from 'express';
import { json } from 'body-parser';
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
const server = express();

server
	.use(
		json(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware(),
	);

db.once('open', () => {
	console.log('Connected to mongodb.');
	server.listen(PORT, (error) => {
		if (error) {
			console.error('error', error);
		}
	});
}).on('error: ', (error) => {
	throw new Error(`Disconnected from mongodb. Reason: ${error}`);
});
