import fetch from 'node-fetch';

import { updateNewsletterSubscriberCount } from './dbApi';

export const updateEcomailSubscriberCount = async () => {
  try {
    const ecomailSubscriberCount = await fetch(
      `${process.env.ECOMAIL_API_URL}${process.env.ECOMAIL_API_SUBSCRIBERS}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          key: process.env.ECOMAIL_KEY,
        },
      },
    ).then((body) => body.json());

    await updateNewsletterSubscriberCount(ecomailSubscriberCount.total);
    console.log(`Subscriber count updated: ${ecomailSubscriberCount.total}`);
  } catch (error) {
    console.error('Subscriber count update failed. Reason: ', error);
    throw new Error('Subscriber count update failed.');
  }
};
