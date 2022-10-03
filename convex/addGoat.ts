import { mutation } from './_generated/server'
import {addTopic} from "./helpers";

export default mutation(
  async ({ db }, goatText: string) => {
    await addTopic(db, 'goats', goatText, {voters: []});
  }
)
