import express from 'express';

import { getNewsletters } from '../../server/dbApi';

export async function get(_: {}, res: express.Response, next: () => void) {
  try {
    const newsletterArchive = await getNewsletters();

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
      res.end(JSON.stringify(newsletterArchivePublic));
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load data.');
  }
}
