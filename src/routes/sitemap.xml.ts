import { Request, Response } from 'express';

import { getNewsletters } from '../server/dbApi';

function renderSitemap(posts) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://davidklimes.cz</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/komentare</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/archiv-newsletteru</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/knihy</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/o-mne</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/o-mne</loc>
  </url>
    <url>
    <loc>https://davidklimes.cz/povolebni-program</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/povolebni-program/dane-se-zvysi</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/povolebni-program/vydaje-musi-klesnout</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/povolebni-program/pandemicky-zakon</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/povolebni-program/stop-stretu-zajmu</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/povolebni-program/narodni-plan-obnovy</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/povolebni-program/tendr-na-dukovany</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/povolebni-program/konec-dluhovych-pasti</loc>
  </url>
  <url>
    <loc>https://davidklimes.cz/povolebni-program/a-co-pak</loc>
  </url>
    ${posts
      .map(
        (article) => `  <url>
    <loc>https://davidklimes.cz/newsletter/${article.id}</loc>
  </url>`,
      )
      .join('\n')}

</urlset>`;
}

export async function get(_: Request, res: Response) {
  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'application/rss+xml',
  });

  const articles = await getNewsletters(0, 0, ['id'], { id: { $gte: 49 } });
  const feed = renderSitemap(articles);
  res.end(feed);
}
