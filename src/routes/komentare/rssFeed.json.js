import { db } from '../../server';

async function getCollectionFromDb(source) {
	return db.collection(source).find({}, { projection: ['title', 'content', 'isoDate', 'link'] }).toArray();
}

export async function get(_, res, next) {
	const [rozhlasRssFeed, aktualneRssFeed] = await Promise.all([
		getCollectionFromDb('rozhlasRssFeed'),
		getCollectionFromDb('aktualneRssFeed'),
	]);

	const identifyRozhlas = rozhlasRssFeed.map((item) => ({ ...item, type: 'rozhlas' }));
	const identifyAktualne = aktualneRssFeed.map((item) => ({ ...item, type: 'aktualne' }));
	const joinFeeds = identifyRozhlas.concat(identifyAktualne);
	const sortDescByDate = joinFeeds.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));

	if (rozhlasRssFeed.length !== 0 && aktualneRssFeed.length !== 0) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(sortDescByDate));
	} else {
		next();
	}
}
