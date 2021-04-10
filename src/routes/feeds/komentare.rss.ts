import { Request, Response } from 'express';

import { getArticles } from '../../server/dbApi';

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}
function renderXmlAtomFeed(posts) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>David Klimeš – komentáře</title>
    <link>https://davidklimes.cz</link>
    <description />
    <language>cs</language>
    <docs>https://www.rssboard.org/rss-specification</docs>
    ${posts
      .map(
        (article) => `
    <item>
      <title>${article.title}</title>
      <link>${escapeHtml(article.link)}</link>
      <description>${article.perex}</description>
      <pubDate>${new Date(article.isoDate).toUTCString()}</pubDate>
    </item>`,
      )
      .join('\n')}
  </channel>
</rss>`;
}

export async function get(_: Request, res: Response) {
  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'text/xml',
  });

  const articles = await getArticles();
  const feed = renderXmlAtomFeed(articles);
  res.end(feed);
}
