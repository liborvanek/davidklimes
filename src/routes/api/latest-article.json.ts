import express from 'express';

import { getLatestArticle } from '../../server/dbApi';

export async function get(_: {}, res: express.Response, next: () => void) {
  const articles = await Promise.all([
    getLatestArticle('komentareRozhlasPlus'),
    getLatestArticle('komentareAktualne'),
  ]);
  const sortedArticlesByDate = articles.sort(
    (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime(),
  );
  if (sortedArticlesByDate) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(sortedArticlesByDate[0]));
  } else {
    next();
  }
}
