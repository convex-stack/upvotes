import { mutation } from './_generated/server'
import {Id} from "./_generated/dataModel";

export default mutation(
  async ({ db, auth }, boatId: Id<'boats'>) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to voteForNote");
    }
    const user = await db
      .table("users")
      .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
      .unique();

    const boatDoc = await db.get(boatId);
    if (boatDoc === null) {
      console.log('How did you vote for a boat that did not exist?.')
    } else {

      const existingBoatVote = await db.table('boatVotes')
        .filter(q => q.and(
          q.eq(q.field('user'), user._id),
          q.eq(q.field('boat'), boatDoc._id)))
        .first();
      if(existingBoatVote !== null) {
        console.log(`Current user ${user._id} has already voted for ${boatDoc.text}`)
        return;
      }

      db.insert('boatVotes', {
        user: user._id,
        boat: boatDoc._id
      })
      console.log(`successfully voted! This user has now voted for boat ${boatDoc.text}`)
    }
  }
)
