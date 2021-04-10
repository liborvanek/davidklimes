import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { updateEcomailSubscriberCount } from '../../../server/getSubscribers';

interface BodyParams {
  email: string;
}

export interface SubscribeSuccessResult {
  email: string;
  already_subscribed: boolean;
}

export async function post(req: Request, res: Response, next: () => void) {
  // TODO: add server side validation
  const { email }: BodyParams = req.body;

  if (req.body.email) {
    const rawResult = await fetch(
      `${process.env.ECOMAIL_API_URL}${process.env.ECOMAIL_API_SUBSCRIBE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          key: process.env.ECOMAIL_KEY,
        },
        body: JSON.stringify({ subscriber_data: { email } }),
      },
    ).then((body) => body.json());

    updateEcomailSubscriberCount();

    const result: SubscribeSuccessResult = {
      email: rawResult.email,
      already_subscribed: rawResult.already_subscribed,
    };

    if (rawResult !== null) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    } else {
      next();
    }
  } else {
    next();
  }
}
