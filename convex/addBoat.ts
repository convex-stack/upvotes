import { mutation } from './_generated/server'
import {addTopic} from "./helpers";

export default mutation(
  async ({ db }, boatText: string) => {
    await addTopic(db, 'boats', boatText, {});
  }
)
