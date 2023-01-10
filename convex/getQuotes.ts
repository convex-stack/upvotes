import { query } from './_generated/server';

export default query(async ({ db }) => {
  const quotesDocs = await db.query('quotes').collect();
  console.log(`Got ${quotesDocs.length} quotes`);
  return quotesDocs.sort((a, b) => b.votes - a.votes);
});
