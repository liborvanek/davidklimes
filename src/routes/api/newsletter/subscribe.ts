import { Request, Response } from 'express';
import fetch from 'node-fetch';

interface BodyParams {
  email: string;
}

export interface SubscribeSuccessResult {
  email: string;
  already_subscribed: boolean;
}

export async function post(req: Request, res: Response, next: () => void) {
  const { email }: BodyParams = req.body;

  if (req.body.email) {
    const rawResult = await fetch(`${process.env.ECOMAIL_URL}/lists/1/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: process.env.ECOMAIL_KEY,
      },
      body: JSON.stringify({ subscriber_data: { email } }),
    }).then((body) => body.json());

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
