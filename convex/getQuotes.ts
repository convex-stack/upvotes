import { query } from './_generated/server';
import { Document } from './_generated/dataModel';

export default query(async ({ db }): Promise<Document<'quotes'>[]> => {
  const quotesDocs = await db.query('quotes').collect();
  console.log(`Got ${quotesDocs.length} quotes`);
  return quotesDocs.sort((a, b) => b.votes - a.votes);
});
