import { mutation } from './_generated/server'
import {Id} from "./_generated/dataModel";
import {getUserDoc} from "./helpers";

export default mutation(
  async ({ db, auth }, noteId: Id<'notes'>) => {
    const user = await getUserDoc(db, auth);
    const noteDoc = await db.get(noteId);
    if (noteDoc === null) {
      console.log('How did you vote for a note that did not exist?.')
    } else {
      if (!user.noteVotes) {
        user.noteVotes = new Set()
      }

      if(user.noteVotes.has(noteDoc._id.id)) {
        console.log(`Current user ${user._id} has already voted for ${noteDoc.text}`)
        return;
      }

      user.noteVotes.add(noteDoc._id.id)
      db.replace(user._id, user)
      console.log(`successfully voted! This user has now voted for ${user.noteVotes.size} notes`)
    }
  }
)
