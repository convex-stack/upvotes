import {mutation} from './_generated/server'
import {addTopic} from "./helpers";

export default mutation(
  async ({ db }, quoteText: string) => {
    await addTopic(db, 'quotes', quoteText, {votes: 0})
  }
)