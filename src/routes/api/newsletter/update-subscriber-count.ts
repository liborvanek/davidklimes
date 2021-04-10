import { Request, Response } from 'express';

import { updateEcomailSubscriberCount } from '../../../server/getSubscribers';

// See https://intercom.help/ecomail/cs/articles/2241902-webhooky
interface BodyParams {
  payload: {
    email: string;
    status: string;
    listId: number;
  };
}

export async function post(req: Request, res: Response, next: () => void) {
  const { payload }: BodyParams = req.body;

  if (payload) {
    try {
      await updateEcomailSubscriberCount();
      res.end('OK');
    } catch (error) {
      console.error(error);
      throw new Error('Failed to load data.');
    }
  } else {
    next();
  }
}
