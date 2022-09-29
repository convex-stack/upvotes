import { addTopic } from './addQuote';
import { mutation } from './_generated/server'

export default mutation(
  async ({ db }, noteText: string) => {
    await addTopic(db, 'notes', noteText, {});
  }
)
