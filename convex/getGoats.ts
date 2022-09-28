import { query } from './_generated/server'
import {Document} from "./_generated/dataModel";

export default query(async ({ db }): Promise<Document<'goats'>[]> => {
  const goatsDocs = await db
    .table('goats')
    .collect()
  if (goatsDocs === null) {
    return []
  }
  console.log(`Got ${goatsDocs.length} goats`);
  return goatsDocs;
})
