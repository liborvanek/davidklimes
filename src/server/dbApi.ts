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
  id: string;
  subject: string;
  settings: {
    subject_line: string;
  };
  archive_url: string;
  long_archive_url: string;
  sent_at: string;
  send_time: string;
}
export interface IArticleWithType extends IArticle {
  type: ArticleType;
}

const defaultArticleFields = ['title', 'content', 'isoDate', 'link'];
const defaultNewsletterFields = [
  'subject',
  'settings.subject_line',
  'archive_url',
  'long_archive_url',
  'sent_at',
  'send_time',
];

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
    .toArray();
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
