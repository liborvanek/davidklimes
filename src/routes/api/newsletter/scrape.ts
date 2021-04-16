import { Request, Response } from 'express';
import fetch from 'node-fetch';

import { newsletterFromEcomail } from '../../../server/newsletterFromEcomail';

export async function post(req: Request, res: Response, next: () => void) {
  try {
    const count = await newsletterFromEcomail();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(count));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load data.');
  }
}
