import { db } from '../server';

export type CollectionType =
  | 'komentareRozhlasPlus'
  | 'komentareAktualne'
  | 'newsletterArchive'
  | 'podcast';
export type ArticleType = 'komentarRozhlasPlus' | 'komentarAktualne' | 'podcast';

export interface IArticle {
  _id: string;
  title: string;
  link: string;
  isoDate: string;
  content?: string;
}

export interface INewsletter {
  _id: string;
  id: number;
  externalId: number;
  title: string;
  isoDate: string;
  markup?: string;
  archiveUrl: string;
  originalData: object;
}
export interface IArticleWithType extends IArticle {
  type: ArticleType;
}

const defaultArticleFields = ['title', 'content', 'isoDate', 'link'];
const defaultNewsletterFields = ['id', 'externalId', 'title', 'archiveUrl', 'isoDate', 'markup'];

export async function getArticles(
  collectionName: string,
  fields: string[] = defaultArticleFields,
): Promise<IArticle[]> {
  return db.collection(collectionName).find({}, { projection: fields }).toArray();
}
export async function getNewsletters(
  fields: string[] = defaultNewsletterFields,
): Promise<INewsletter[]> {
  return db
    .collection('newsletterArchive')
    .find(
      {},
      {
        projection: fields,
      },
    )
    .sort({ id: -1 })
    .toArray();
}
export async function getNewsletter(
  fields: string[] = defaultNewsletterFields,
  id: number,
): Promise<INewsletter> {
  return db.collection('newsletterArchive').findOne(
    { id },
    {
      projection: fields,
    },
  );
}

export async function getArticlesInInterval(
  collectionName: CollectionType,
  firstDayDateString?: string,
  lastDayDateString?: string,
): Promise<IArticle[]> {
  return db
    .collection(collectionName)
    .find(
      { isoDate: { $gte: firstDayDateString, $lte: lastDayDateString } },
      { projection: defaultArticleFields },
    )
    .toArray();
}

export async function getLatestArticle(source: CollectionType): Promise<IArticle> {
  return db
    .collection(source)
    .findOne({}, { sort: { isoDate: -1 }, projection: ['title', 'isoDate', 'link'] });
}

export async function insertMultipleArticles<T>(collectionName: string, insertedArray: T[]) {
  return await db.collection(collectionName).insertMany(insertedArray);
}
