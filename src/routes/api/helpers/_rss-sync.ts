import { Request, Response } from 'express';

import { rssFeed } from '../../../server/rssFeed';

export async function get(req: Request, res: Response, next: () => void) {
  rssFeed();

  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.end('ahoj');
}
