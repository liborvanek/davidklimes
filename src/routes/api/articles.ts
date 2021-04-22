import { Request, Response } from 'express';

import { getArticles, getCount } from '../../server/dbApi';

export async function get(req: Request, res: Response, next: () => void) {
  // See https://evanhahn.com/gotchas-with-express-query-parsing-and-how-to-avoid-them/
  const query = (req.query as unknown) as URLSearchParams;
  const articlesPerPage = 12;
  const skip = query.get('page') ? (parseInt(query.get('page')) - 1) * articlesPerPage : 0;

  try {
    const [articles, count] = await Promise.all([
      getArticles(articlesPerPage, skip),
      getCount('articles'),
    ]);

    if (articles.length !== 0) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ articles, count }));
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load articles.');
  }
}
