import { mutation } from './_generated/server'
import {addTopic} from "./helpers";

export default mutation(
  async ({ db }, noteText: string) => {
    await addTopic(db, 'notes', noteText, {});
  }
)
