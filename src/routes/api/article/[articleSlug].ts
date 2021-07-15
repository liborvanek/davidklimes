import { Request, Response } from 'express';

import { getArticle } from '../../../server/dbApi';

export async function get(req: Request, res: Response, next: () => void) {
  const { articleSlug } = req.params;

  if (!articleSlug) {
    next();
  }

  const sanitizedSlug = articleSlug.replace(/[^a-zA-Z0-9\-]/g, "");

  try {
    const article = await getArticle(['markup', 'title', 'isoDate', 'id'], sanitizedSlug);

    if (article && article.markup) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(article));
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load data.');
  }
}
