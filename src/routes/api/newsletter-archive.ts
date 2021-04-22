import { Request, Response } from 'express';

import { getNewsletters, getCount } from '../../server/dbApi';

export async function get(req: Request, res: Response, next: () => void) {
  // See https://evanhahn.com/gotchas-with-express-query-parsing-and-how-to-avoid-them/
  const query = (req.query as unknown) as URLSearchParams;
  const articlesPerPage = 12;
  const skip = query.get('page') ? (parseInt(query.get('page')) - 1) * articlesPerPage : 0;

  try {
    const [newsletterArchive, count] = await Promise.all([
      getNewsletters(articlesPerPage, skip),
      getCount('newsletterArchive'),
    ]);

    const newsletterArchivePublic = newsletterArchive.map(
      ({ title, isoDate, archiveUrl, markup, id }) => ({
        id,
        title,
        isoDate,
        archiveUrl: markup ? null : archiveUrl,
      }),
    );

    if (newsletterArchivePublic.length !== 0) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ newsletterArchive: newsletterArchivePublic, count }));
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load newsletters.');
  }
}
