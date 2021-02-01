import express from 'express';

import { getNewsletters } from '../../server/dbApi';

// TODO: ecomail prefix needs to go to regex in replace
function trimmerSubject(subject: string): string {
  return subject.replace('Newsletter DK: ', '');
}

export async function get(_: {}, res: express.Response, next: () => void) {
  try {
    const newsletterArchive = await getNewsletters();

    const unifiedNewsletterArchive = newsletterArchive.map((item) => ({
      subject: item.subject || trimmerSubject(item.settings.subject_line),
      date: item.sent_at || item.send_time,
      link: item.long_archive_url || item.archive_url,
    }));

    const sortedNewsletterArchiveByDate = unifiedNewsletterArchive.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    if (sortedNewsletterArchiveByDate.length !== 0) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(sortedNewsletterArchiveByDate));
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load data.');
  }
}
