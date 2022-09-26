import { mutation } from './_generated/server'
import {Id} from "./_generated/dataModel";

export default mutation(
  async ({ db }, quoteId: Id, increment: number) => {
    const quoteDoc = await db.get(quoteId);
    if (quoteDoc === null) {
      console.log('How did you vote for a quote that did not exist?.')
    } else {
      quoteDoc.votes += increment
      db.replace(quoteDoc._id, quoteDoc)
      console.log(`Value of counter is now ${quoteDoc.votes}.`)
    }
  }
)
