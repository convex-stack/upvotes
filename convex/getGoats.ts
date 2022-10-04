import { query } from './_generated/server'
import {Document} from "./_generated/dataModel";

export default query(async ({ db }): Promise<Document<'goats'>[]> => {
  const goatsDocs = await db
    .query('goats')
    .collect()
  if (goatsDocs === null) {
    return []
  }
  console.log(`Got ${goatsDocs.length} goats`);
  return goatsDocs.sort((a, b) => b.voters.length - a.voters.length);
})
