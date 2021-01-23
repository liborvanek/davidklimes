import express from 'express';

import { db } from '../../server';

interface RawNewsletterItem {
  _id: string;
  subject: string;
  settings: {
    subject_line: string;
  };
  archive_url: string;
  long_archive_url: string;
  sent_at: string;
  send_time: string;
}

async function getCollectionFromDb(): Promise<RawNewsletterItem[]> {
  return db
    .collection('newsletterArchive')
    .find(
      {},
      {
        projection: [
          'subject',
          'settings.subject_line',
          'archive_url',
          'long_archive_url',
          'sent_at',
          'send_time',
        ],
      },
    )
    .toArray();
}

// TODO: ecomail prefix needs to go to regex in replace
function trimmerSubject(subject: string): string {
  return subject.replace('Newsletter DK: ', '');
}

export async function get(_: {}, res: express.Response, next: () => void) {
  const newsletterArchive = await getCollectionFromDb();

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
}
