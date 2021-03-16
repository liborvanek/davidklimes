import fetch from 'node-fetch';

import { insertMultipleArticles, getNewsletters, INewsletter } from './dbApi';
import { parseEcomailHtmlEmail } from './parseEcomailHtmlEmail';

// TODO: unify with rss compare fn
const compareNewsletterItems = (newsletterFeed: any, collectionIds: number[]) => [
  ...newsletterFeed.filter(({ id }: { id: number }) => !collectionIds.includes(id)),
];

export const newsletterFromEcomail = async () => {
  try {
    const rawNewsletterCollection = await getNewsletters(500, 0, ['externalId']);
    const newsletterCollectionIds = rawNewsletterCollection.map(({ externalId }) => externalId);

    // status=3 => sent
    const ecomailNewsletters = await fetch(
      `${process.env.ECOMAIL_API_URL}/campaigns?filters[status]=3`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          key: process.env.ECOMAIL_KEY,
        },
      },
    ).then((body) => body.json());

    const onlyNewNewsletters = compareNewsletterItems(ecomailNewsletters, newsletterCollectionIds);

    const newNewslettersWithParsedMarkup: INewsletter[] = await Promise.all(
      onlyNewNewsletters.map(async (newsletter) => ({
        _id: undefined,
        id: parseInt(newsletter.title),
        externalId: newsletter.id,
        title: newsletter.subject.replace('Newsletter DK: ', ''),
        isoDate: new Date(newsletter.sent_at).toISOString(),
        markup: await parseEcomailHtmlEmail(newsletter.id),
        archiveUrl: newsletter.archive_url,
        originalData: newsletter,
      })),
    );

    if (onlyNewNewsletters.length !== 0) {
      insertMultipleArticles('newsletterArchive', newNewslettersWithParsedMarkup);
    }

    console.log(
      `Newsletter sync is successfull.
        Added: ${onlyNewNewsletters.length} new newsletter(s).`,
    );
  } catch (error) {
    console.error('Newsletter sync failed, reason: ', error);
  }
};
