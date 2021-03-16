import { Request, Response } from 'express';

import { db } from '../../../server';

export async function get(req: Request, res: Response, next: () => void) {
  const plus: any = await db.collection('komentareRozhlasPlus').find().toArray();

  plus.map(async (r) => {
    const transformed = {
      _id: r._id,
      type: 'komentarRozhlasPlus',
      title: r.title,
      link: r.link,
      isoDate: r.isoDate,
      perex: r.content.replace('David Klimeš', ''),
      originalData: r,
    };
    console.log(await db.collection('testo').insertOne(transformed));
  });
  const aktualne: any = await db.collection('komentareAktualne').find().toArray();
  aktualne.map(async (a) => {
    const transformed = {
      _id: a._id,
      type: 'komentarAktualne',
      title: a.title,
      link: a.link,
      isoDate: a.isoDate,
      perex: a.content,
      originalData: a,
    };
    console.log(await db.collection('testo').insertOne(transformed));
  });
  res.setHeader('Content-Type', 'text/plain');
  res.end('ok');
}
