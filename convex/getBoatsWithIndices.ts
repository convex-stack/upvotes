import { DatabaseReader, query } from './_generated/server';
import { Document, Id } from './_generated/dataModel';
import { getUserDoc } from './helpers';

export type BoatWithVotingInfo = Document<'boats'> & {
  votes: number;
  disableVoting: boolean;
};

export default query(async ({ db, auth }): Promise<BoatWithVotingInfo[]> => {
  const user = await getUserDoc(db, auth);
  const boatDocs = await db.query('boats').collect();
  console.log(`Got ${boatDocs.length} boats`);
  const boatDocsWithVotingInfo: BoatWithVotingInfo[] = [];
  for (const boatDoc of boatDocs) {
    // Go through the boats individually and query convex for their voting info
    // We could alternately just query the entire boatVotes table
    // and process each of the votes in typescript
    boatDocsWithVotingInfo.push(await getVoteInfoForBoat(db, boatDoc, user));
  }
  return boatDocsWithVotingInfo.sort((a, b) => b.votes - a.votes);
});

async function getVoteInfoForBoat(
  db: DatabaseReader,
  boatDoc: Document<'boats'>,
  user: Document<'users'>
) {
  // has this user voted for the boat?
  const existingBoatVote = await db
    .query('boatVotes')
    .withIndex('by_boat_and_user', (q) =>
      q.eq('boat', boatDoc._id).eq('user', user._id)
    )
    .first();
  // how many users have voted for the boat?
  const votes = (
    await db
      .query('boatVotes')
      .withIndex('by_boat', (q) => q.eq('boat', boatDoc._id))
      .collect()
  ).length;

  return {
    votes,
    disableVoting: existingBoatVote !== null,
    ...boatDoc,
  };
}
