import express from 'express';
import { startOfWeek, endOfWeek } from 'date-fns';

import { getArticlesInInterval } from '../../server/dbApi';
import { formatDate } from '../../utils';

export async function get(_: {}, res: express.Response, next: () => void) {
  const now = new Date();

  const firstDayOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }).toISOString();
  const lastDayOfThisWeek = endOfWeek(now, { weekStartsOn: 1 }).toISOString();

  const [komentareRozhlasPlus, komentareAktualne] = await Promise.all([
    getArticlesInInterval('komentareRozhlasPlus', firstDayOfThisWeek, lastDayOfThisWeek),
    getArticlesInInterval('komentareAktualne', firstDayOfThisWeek, lastDayOfThisWeek),
  ]);

  const joinFeeds = komentareRozhlasPlus.concat(komentareAktualne);
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
