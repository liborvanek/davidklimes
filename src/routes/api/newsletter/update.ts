import express from 'express';
import fetch from 'node-fetch';

interface BodyParams {
  email: string;
  jmeno?: string;
  prijmeni?: string;
  note?: string;
}

export async function put(req: express.Request, res: express.Response, next: () => void) {
  // TODO: add server side validation
  const { email, jmeno, prijmeni, note }: BodyParams = req.body;

  if (email && (jmeno || prijmeni || note)) {
    const result = await fetch(`${process.env.ECOMAIL_URL}/lists/1/update-subscriber`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        key: process.env.ECOMAIL_KEY,
      },
      body: JSON.stringify({
        email,
        subscriber_data: {
          name: jmeno,
          surname: prijmeni,
          custom_fields: {
            note,
          },
        },
      }),
    }).then((body) => body.json());
    // TODO: fix this to return only necessary values
    console.log('result from ecomail update fn: ', result);

    if (result !== null) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    } else {
      next();
    }
  } else {
    next();
  }
}
