import {DatabaseReader, query } from './_generated/server'
import {Document, Id} from "./_generated/dataModel";
import {getUserDoc} from "./helpers";

export type BoatWithVotingInfo = Document<'boats'> & {
  votes: number,
  disableVoting: boolean,
}

export default query(async ({ db , auth}): Promise<BoatWithVotingInfo[]> => {
  const user = await getUserDoc(db, auth);
  const boatDocs = await db.query('boats').collect()
  if (boatDocs === null) {
    return []
  }
  console.log(`Got ${boatDocs.length} boats`);

  // Query the entire boatVotes table and process each vote in typescript
  const allVotes = await db.query('boatVotes').collect()

  const boatsWithVotingInfoById: Record<string, BoatWithVotingInfo> = {};
  boatDocs.forEach(boat => {
    boatsWithVotingInfoById[boat._id.id] = {
      votes: 0,
      disableVoting: false,
      ...boat
    }
  })
  for (const voteDoc of allVotes) {
    boatsWithVotingInfoById[voteDoc.boat.id].votes += 1
    if (voteDoc.user.equals(user._id)) {
      boatsWithVotingInfoById[voteDoc.boat.id].disableVoting = true
    }
  }
  const result = []
  for (let boatId in boatsWithVotingInfoById) {
    result.push(boatsWithVotingInfoById[boatId])
  }

  return result.sort((a,b)=> b.votes - a.votes);
})
