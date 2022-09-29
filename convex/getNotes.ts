import { query } from './_generated/server'
import {Document, Id} from "./_generated/dataModel";

type NoteWithVotingInfo = Document<'notes'> & {
  votes: number,
  disableVoting: boolean,
}

export default query(async ({ db , auth}): Promise<NoteWithVotingInfo[]> => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated call to voteForNote");
  }
  const user = await db
    .table("users")
    .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
    .unique();

  const alreadyVotedIds = new Set([...user.noteVotes ?? []].map((noteId: Id<'notes'>) => noteId.id))

  const notesDocs = await db
    .table('notes')
    .collect()
  if (notesDocs === null) {
    return []
  }
  console.log(`Got ${notesDocs.length} notes`);


  const notesWithVotingInfoByNoteId: Record<string, NoteWithVotingInfo> = {};

  notesDocs.forEach((note) => {
    // type GenericId<'notes'> cannot be used as an index type...
    notesWithVotingInfoByNoteId[note._id.id] = {
      disableVoting: alreadyVotedIds.has(note._id.id),
      votes: 0,
      ...note
    }
  })
  // To fill in the votes for each note, we need to look at *all* the users
  // and count up each of their votes
  const allUsers = await db
    .table("users").collect();
  allUsers.forEach(({noteVotes}) => {
    if (noteVotes) {
      noteVotes.forEach(({id}) => {
        notesWithVotingInfoByNoteId[id].votes += 1
      })
    }
  })

  const result = []
  for (let noteId in notesWithVotingInfoByNoteId) {
    result.push(notesWithVotingInfoByNoteId[noteId])
  }

  return result;
})
