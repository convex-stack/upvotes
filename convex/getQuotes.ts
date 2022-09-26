import { query } from './_generated/server'
import {Id} from "./_generated/dataModel";

export default query(async ({ db }): Promise<{id: Id, text: string, votes: number}[]> => {
  const quotesDocs = await db
    .table('quotes')
    .collect()
  if (quotesDocs === null) {
    return []
  }
  console.log(`Got ${quotesDocs.length} quotes`);
  return quotesDocs.map((quoteDoc) => {return {
    id: quoteDoc._id,
    text: quoteDoc.text,
    votes: quoteDoc.votes,
  }}).sort((a, b) => b.votes - a.votes);
})
