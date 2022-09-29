import { mutation } from './_generated/server'
import {Id} from "./_generated/dataModel";

export default mutation(
  async ({ db, auth }, goatId: Id<'goats'>) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to sendMessage");
    }
    const user = await db
      .table("users")
      .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
      .unique();

    const goatDoc = await db.get(goatId);
    if (goatDoc === null) {
      console.log('How did you vote for a goat that did not exist?.')
    } else {
      console.log(goatDoc.voters, user._id)
      const existingIds = goatDoc.voters.map((v) => v.id);
      if (existingIds.indexOf(user._id.id) < 0) {
        goatDoc.voters.push(user._id)
        db.replace(goatDoc._id, goatDoc)
        console.log(`successfully voted! This goat now has ${goatDoc.voters.length} votes`)
      } else {
        console.log(`Current user ${user._id} has already voted for ${goatDoc.text}`)

      }
    }
  }
)