import { Request, Response } from 'express';

import { newsletterFromEcomail } from '../../../server/newsletterFromEcomail';
import { newslettersFromMc } from '../../../server/newsletterFromMc';
import { parseEcomailHtmlEmail } from '../../../server/parseEcomailHtmlEmail';

export async function get(req: Request, res: Response, next: () => void) {
  // TODO: add server side validation
  const { slug } = req.params;

  if (!slug) {
    next();
  }

  // newslettersFromMc();
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.end(await parseEcomailHtmlEmail(10));
}
