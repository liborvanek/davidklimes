import { Request, Response } from 'express';

import { getNewsletterSubscriberCount } from '../../../server/dbApi';
export async function get(req: Request, res: Response, next: () => void) {
  try {
    const siteData = await getNewsletterSubscriberCount();

    res.end(`${siteData.newsletterSubscriberCount}`);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load data.');
  }
}
