import express from 'express';

import { db } from '../../server';

type CollectionType = 'rozhlasRssFeed' | 'aktualneRssFeed';
type RssFeedItemType = 'rozhlas' | 'aktualne';

interface RawRssFeedItem {
  _id: string;
  title: string;
  content: string;
  isoDate: string;
  link: string;
}

export interface RawRssFeedItemWithType extends RawRssFeedItem {
  type: RssFeedItemType;
}

async function getCollectionFromDb(source: CollectionType): Promise<RawRssFeedItem[]> {
  return db
    .collection(source)
    .find({}, { projection: ['title', 'content', 'isoDate', 'link'] })
    .toArray();
}

export async function get(_: {}, res: express.Response, next: () => void) {
  const [rozhlasRssFeed, aktualneRssFeed] = await Promise.all([
    getCollectionFromDb('rozhlasRssFeed'),
    getCollectionFromDb('aktualneRssFeed'),
  ]);

  const identifyRozhlas: RawRssFeedItemWithType[] = rozhlasRssFeed.map((item) => ({
    ...item,
    type: 'rozhlas',
  }));
  const identifyAktualne: RawRssFeedItemWithType[] = aktualneRssFeed.map((item) => ({
    ...item,
    type: 'aktualne',
  }));
  const joinFeeds = identifyRozhlas.concat(identifyAktualne);
  const sortedFeedsByDate = joinFeeds.sort(
    (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime(),
  );

  if (rozhlasRssFeed.length !== 0 && aktualneRssFeed.length !== 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(sortedFeedsByDate));
  } else {
    next();
  }
}
