import { db } from '../server';

export const query = (collectionName: string, fields: string[]) =>
  db.collection(collectionName).find({}, { projection: fields }).toArray();

export const insertMany = async <T>(collectionName: string, insertedArray: T[]) => {
  await db.collection(collectionName).insertMany(insertedArray);
};
