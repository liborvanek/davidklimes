import Parser from 'rss-parser';

import { insertMultipleArticles, getArticles, IArticle } from './dbApi';

interface IArticleGuid extends IArticle {
  guid: string;
}

const rssParser = new Parser();

const compareRssItems = (rssFeed: any, collectionIds: string[]) => [
  ...rssFeed.items.filter(({ guid }: { guid: string }) => !collectionIds.includes(guid)),
];

export const rssFeed = async () => {
  try {
    const [rawRozhlasCollection, rawAktualneCollection] = await Promise.all([
      getArticles('komentareRozhlasPlus', ['guid']) as Promise<IArticleGuid[]>,
      getArticles('komentareAktualne', ['guid']) as Promise<IArticleGuid[]>,
    ]);
    const rozhlasCollectionIds: string[] = rawRozhlasCollection.map(({ guid }) => guid);
    const aktualneCollectionIds: string[] = rawAktualneCollection.map(({ guid }) => guid);

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
    const onlyNewRozhlasRss = compareRssItems(filteredRozhlasRss, rozhlasCollectionIds);
    const onlyNewAktualneRss = compareRssItems(rawAktualneRss, aktualneCollectionIds);

    // remove categories from aktualne feed because it contains forbidden field $
    const correctOnlyNewAktualneRss = onlyNewAktualneRss.map(
      ({ categories, ...rest }: any) => rest,
    );

    if (onlyNewRozhlasRss.length !== 0) {
      insertMultipleArticles('komentareRozhlasPlus', onlyNewRozhlasRss);
    }

    if (correctOnlyNewAktualneRss.length !== 0) {
      insertMultipleArticles('komentareAktualne', correctOnlyNewAktualneRss);
    }

    console.log(
      `Rss sync is successfull.
        Added: ${onlyNewRozhlasRss.length} rozhlas items.
        Added: ${correctOnlyNewAktualneRss.length} aktualne items`,
    );
  } catch (error) {
    console.error('Rss sync failed. Reason: ', error);
  }
};
