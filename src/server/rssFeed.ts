import Parser from 'rss-parser';

import { insertMultipleArticles, getArticles } from './dbApi';

interface IArticleGuid {
  _id: string;
  originalData: {
    guid: string;
  };
}
const rssParser = new Parser();

const compareRssItems = (rssFeed: any, collectionIds: string[]) => [
  ...rssFeed.items.filter(({ guid }: { guid: string }) => !collectionIds.includes(guid)),
];

export const rssFeed = async () => {
  try {
    const articles: IArticleGuid[] = ((await getArticles(100, 0, [
      'originalData.guid',
    ])) as unknown) as IArticleGuid[];
    const articleGuids: string[] = articles
      .map(({ originalData }) => originalData?.guid)
      .filter((guid) => !!guid);

    const [rawRozhlasRss, rawAktualneRss] = await Promise.all([
      rssParser.parseURL(process.env.ROZHLAS_RSSFEED_URL),
      rssParser.parseURL(process.env.AKTUALNE_RSSFEED_URL),
    ]);

    // rozhlas is sending all authors
    const filteredRozhlasRss = {
      items: rawRozhlasRss.items
        .filter(({ title }) => title?.includes('David Klimeš'))
        .map((item) => ({ ...item, title: item.title?.split('David Klimeš: ')[1] })),
    };
    const onlyNewRozhlasRss = compareRssItems(filteredRozhlasRss, articleGuids);
    const onlyNewAktualneRss = compareRssItems(rawAktualneRss, articleGuids);

    // Format parsed information
    const articlesRozhlasPlus = onlyNewRozhlasRss.map((a) => ({
      type: 'komentarRozhlasPlus',
      title: a.title,
      link: a.link,
      isoDate: a.isoDate,
      perex: a.content.replace('David Klimeš', ''),
      originalData: a,
    }));

    // remove categories from aktualne feed because it contains forbidden field $
    const articlesAktualne = onlyNewAktualneRss.map(({ categories, ...a }: any) => ({
      type: 'komentarAktualne',
      title: a.title,
      link: a.link,
      isoDate: a.isoDate,
      perex: a.content,
      originalData: a,
    }));

    if (articlesRozhlasPlus.length > 0) {
      insertMultipleArticles('articles', articlesRozhlasPlus);
    }

    if (articlesAktualne.length > 0) {
      insertMultipleArticles('articles', articlesAktualne);
    }

    console.log(
      `Rss sync is successfull.
        Added: ${articlesRozhlasPlus.length} Rozhlas Plus items.
        Added: ${articlesAktualne.length} Aktualne items`,
    );
  } catch (error) {
    console.error('Rss sync failed. Reason: ', error);
  }
};
