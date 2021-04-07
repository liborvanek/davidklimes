import { Request, Response } from 'express';

import { getNewsletter } from '../../../server/dbApi';

export async function get(req: Request, res: Response, next: () => void) {
  const { newsletterId } = req.params;

  const id = parseInt(newsletterId);

  if (!id) {
    next();
  }

  try {
    const newsletter = await getNewsletter(['markup', 'title', 'isoDate', 'id'], id);

    if (newsletter && newsletter.markup) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(newsletter));
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load data.');
  }
}
