import { mutation } from './_generated/server'
import {Id} from "./_generated/dataModel";

export default mutation(
  async ({ db, auth }, noteId: Id<'notes'>) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to voteForNote");
    }
    const user = await db
      .table("users")
      .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
      .unique();

    const noteDoc = await db.get(noteId);
    if (noteDoc === null) {
      console.log('How did you vote for a note that did not exist?.')
    } else {
      if (!user.noteVotes) {
        user.noteVotes = new Set()
      }

      // *sigh* looping through the whole set here wipes out the benefit of using a set in the first place
      // it's necessary since convex Ids don't compare correctly using ===, so set methods like .has don't
      // work as expected.
      for (const noteId of user.noteVotes) {
        if(noteId.equals(noteDoc._id)) {
          console.log(`Current user ${user._id} has already voted for ${noteDoc.text}`)
          return;
        }
      }
      user.noteVotes.add(noteDoc._id)
      db.replace(user._id, user)
      console.log(`successfully voted! This user has now voted for ${user.noteVotes.size} notes`)


    }
  }
)
