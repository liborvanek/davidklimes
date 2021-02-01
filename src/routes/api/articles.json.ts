import express from 'express';

import { db } from '../../server';
import { getArticles, IArticleWithType } from '../../server/dbApi';

export async function get(_: {}, res: express.Response, next: () => void) {
  const [komentareRozhlasPlus, komentareAktualne] = await Promise.all([
    getArticles('komentareRozhlasPlus'),
    getArticles('komentareAktualne'),
  ]);

  const taggedRozhlasArticles: IArticleWithType[] = komentareRozhlasPlus.map((item) => ({
    ...item,
    type: 'komentarRozhlasPlus',
  }));
  const taggedAktualneArticles: IArticleWithType[] = komentareAktualne.map((item) => ({
    ...item,
    type: 'komentarAktualne',
  }));

  const joinedFeeds = taggedRozhlasArticles.concat(taggedAktualneArticles);
  const articlesSortedByDate = joinedFeeds.sort(
    (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime(),
  );

  if (komentareRozhlasPlus.length !== 0 && komentareAktualne.length !== 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(articlesSortedByDate));
  } else {
    next();
  }
}
