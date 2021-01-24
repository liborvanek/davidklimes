import express from 'express';
import { startOfWeek, endOfWeek } from 'date-fns';

import { db } from '../../server';
import { formatDate } from '../../utils';
import type { RawRssFeedItem, CollectionType } from './rssFeed.json';

async function getCollectionFromDb(
  source: CollectionType,
  firstDayDateString: string,
  lastDayDateString: string,
): Promise<RawRssFeedItem[]> {
  return db
    .collection(source)
    .find(
      { isoDate: { $gte: firstDayDateString, $lte: lastDayDateString } },
      { projection: ['title', 'content', 'isoDate', 'link'] },
    )
    .toArray();
}

export async function get(_: {}, res: express.Response, next: () => void) {
  const now = new Date();

  const firstDayOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }).toISOString();
  const lastDayOfThisWeek = endOfWeek(now, { weekStartsOn: 1 }).toISOString();

  const [rozhlasRssFeed, aktualneRssFeed] = await Promise.all([
    getCollectionFromDb('rozhlasRssFeed', firstDayOfThisWeek, lastDayOfThisWeek),
    getCollectionFromDb('aktualneRssFeed', firstDayOfThisWeek, lastDayOfThisWeek),
  ]);

  const joinFeeds = rozhlasRssFeed.concat(aktualneRssFeed);
  const sortedFeedsByDate = joinFeeds.sort(
    (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime(),
  );

  const rssFeed = sortedFeedsByDate.map((item) => ({ ...item, date: formatDate(item.isoDate) }));

  const prefix = '<ol>';
  const contentString = rssFeed.reduce((total, current) => {
    total += `
  <li>
    <p>
      <strong><a href="${current.link}">${current.title}</a></strong><br />
      <span style="font-size: 14px">${current.content}</span><br />
      <span style="color: #7f8c8d"
        ><span style="font-size: 12px"><em>${current.date}</em></span></span>
    </p>
  </li>`;
    return total;
  }, '');
  const suffix = '\n</ol>';
  const finalHtmlMarkupToDisplay = prefix + contentString + suffix;

  if (sortedFeedsByDate.length !== 0) {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end(finalHtmlMarkupToDisplay);
  } else {
    next();
  }
}
