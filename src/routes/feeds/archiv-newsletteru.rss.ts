import { Request, Response } from 'express';

import { getNewsletters } from '../../server/dbApi';

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
  console.log(posts);

  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>David Klimeš – archiv newsletterů</title>
        <link>https://davidklimes.cz/archiv-newsletteru</link>
        <description>Všechna čísla newsletteru o podstatných souvislostech v byznysu a politice.</description>
        <language>cs</language>
        <docs>https://www.rssboard.org/rss-specification</docs>
        ${posts
          .map(
            (article) => `<item>
          <title>${article.title}</title>
          <link>https://davidklimes.cz/newsletter/${article.id}</link>
          <pubDate>${new Date(article.isoDate).toUTCString()}</pubDate>
        </item>
        `,
          )
          .join('\n')}
      </channel>
    </rss>
    `;
}

export async function get(_: Request, res: Response) {
  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
    'Content-Type': 'text/xml',
  });

  const articles = await getNewsletters(12, 0, ['id', 'title', 'isoDate']);
  const feed = renderXmlAtomFeed(articles);
  res.end(feed);
}
