import { addTopic } from './addQuote';
import { mutation } from './_generated/server'

export default mutation(
  async ({ db }, goatText: string) => {
    await addTopic(db, 'goats', goatText, {voters: []});
  }
)
