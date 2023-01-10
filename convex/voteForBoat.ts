import { mutation } from './_generated/server';
import { Id } from './_generated/dataModel';
import { getUserDoc } from './helpers';

export default mutation(async ({ db, auth }, boatId: Id<'boats'>) => {
  const user = await getUserDoc(db, auth);
  const boatDoc = await db.get(boatId);
  if (boatDoc === null) {
    throw 'How did you vote for a boat that did not exist?.';
  } else {
    const existingBoatVote = await db
      .query('boatVotes')
      .withIndex('by_boat_and_user', (q) =>
        q.eq('boat', boatDoc._id).eq('user', user._id)
      )
      .unique();
    if (existingBoatVote !== null) {
      console.log(
        `Current user ${user._id} has already voted for ${boatDoc.text}`
      );
      return;
    }

    db.insert('boatVotes', {
      user: user._id,
      boat: boatDoc._id,
    });
    console.log(
      `successfully voted! This user has now voted for boat ${boatDoc.text}`
    );
  }
});
