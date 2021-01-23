import fetch from 'node-fetch';

import { insertMany, query } from './dbUtils';

// TODO: unify with rss compare fn
const compareNewsletterItems = (newsletterFeed: any, collectionIds: string[]) => [
  ...newsletterFeed.filter(({ id }: { id: string }) => !collectionIds.includes(id)),
];

export const newsletterFromEcomail = async () => {
  try {
    const rawNewsletterCollection = await query('newsletterArchive', ['id']);
    const newsletterCollectionIds = rawNewsletterCollection.map(({ id }) => id);

    const ecomailNewsletters = await fetch(
      `${process.env.ECOMAIL_URL}/campaigns?filters[status]=3`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          key: process.env.ECOMAIL_KEY,
        },
      },
    ).then((body) => body.json());

    const onlyNewNewsletters = compareNewsletterItems(ecomailNewsletters, newsletterCollectionIds);

    if (onlyNewNewsletters.length !== 0) {
      insertMany('newsletterArchive', onlyNewNewsletters);
    }

    console.log(
      `Newsletter sync is successfull.
        Added: ${onlyNewNewsletters.length} new newsletter(s).`,
    );
  } catch (error) {
    console.error('Newsletter sync failed, reason: ', error);
  }
};
