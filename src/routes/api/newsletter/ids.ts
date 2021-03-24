import { Request, Response } from 'express';

import { getNewsletters } from '../../../server/dbApi';
export async function get(req: Request, res: Response, next: () => void) {
  try {
    const newsIds = await getNewsletters(5, 0, ['id']);
    const cleanIds = newsIds.map(({ id }) => id);
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.end(JSON.stringify(cleanIds));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load data.');
  }
}
