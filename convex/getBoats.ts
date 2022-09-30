import {DatabaseReader, query } from './_generated/server'
import {Document, Id} from "./_generated/dataModel";

type BoatWithVotingInfo = Document<'boats'> & {
  votes: number,
  disableVoting: boolean,
}

export default query(async ({ db , auth}): Promise<BoatWithVotingInfo[]> => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated call to voteForNote");
  }
  const user = await db
    .table("users")
    .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
    .unique();

  const boatDocs = await db
    .table('boats')
    .collect()
  if (boatDocs === null) {
    return []
  }
  console.log(`Got ${boatDocs.length} boats`);
  const boatDocsWithVotingInfo: BoatWithVotingInfo[] = []
  for (const boatDoc of boatDocs) {
    // Go through the boats individually and query convex for their voting info
    // We could alternately just query the entire boatVotes table
    // and process each of the votes in typescript
    boatDocsWithVotingInfo.push(await getVoteInfoForBoat(db, boatDoc, user));
  }
  return boatDocsWithVotingInfo.sort((a,b)=> b.votes - a.votes);
})


async function getVoteInfoForBoat(db: DatabaseReader, boatDoc: Document<'boats'>, user: Document<'users'>) {
  // has this user voted for the boat?
  const existingBoatVote = await db.table('boatVotes')
    .filter(q => q.and(
      q.eq(q.field('user'), user._id),
      q.eq(q.field('boat'), boatDoc._id)))
    .first();
  // how many users have voted for the boat?
  const votes = (await db.table('boatVotes')
    .filter(q => q.eq(q.field('boat'), boatDoc._id))
    .collect()).length;

  return {
    votes,
    disableVoting: existingBoatVote !== null,
    ...boatDoc
  }
}