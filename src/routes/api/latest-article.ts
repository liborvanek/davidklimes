import { Request, Response } from 'express';

import { getLatestArticle } from '../../server/dbApi';

export async function get(_: Request, res: Response, next: () => void) {
  try {
    const article = await getLatestArticle('articles');
    if (article) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(article));
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load newsletters.');
  }
}
