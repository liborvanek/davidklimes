import { Request, Response } from 'express';

export async function post(_: Request, res: Response) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('ok');
}
