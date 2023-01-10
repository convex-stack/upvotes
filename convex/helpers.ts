import { DatabaseReader, DatabaseWriter } from './_generated/server';
import { Auth } from 'convex/server';
import { TableNames } from './_generated/dataModel';

export async function getUserDoc(db: DatabaseReader, auth: Auth) {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error('Unauthenticated call to getUserDoc');
  }
  const user = await db
    .query('users')
    .filter((q) => q.eq(q.field('tokenIdentifier'), identity.tokenIdentifier))
    .unique();
  return user!;
}

export async function addTopic(
  db: DatabaseWriter,
  tableName: TableNames,
  topicText: string,
  defaultFields: any
) {
  const quoteDoc = await db
    .query(tableName)
    .filter((q) => q.eq(q.field('text'), topicText))
    .unique();
  if (quoteDoc === null) {
    db.insert(tableName, {
      text: topicText,
      ...defaultFields,
    });
    console.log(`Created 1 new ${tableName}.`);
  } else {
    console.log(`${tableName} with text ${topicText} already exists`);
  }
}
