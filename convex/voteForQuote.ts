import { mutation } from './_generated/server';
import { Id } from './_generated/dataModel';

export default mutation(
  async ({ db }, quoteId: Id<'quotes'>, increment: number) => {
    const quoteDoc = await db.get(quoteId);
    if (quoteDoc === null) {
      throw 'How did you vote for a quote that did not exist?.';
    } else {
      quoteDoc.votes += increment;
      db.replace(quoteDoc._id, quoteDoc);
      console.log(`This quote now has ${quoteDoc.votes} votes.`);
    }
  }
);
