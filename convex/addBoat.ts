import { addTopic } from './addQuote';
import { mutation } from './_generated/server'

export default mutation(
  async ({ db }, boatText: string) => {
    await addTopic(db, 'boats', boatText, {});
  }
)
