import {mutation} from './_generated/server'
import {Id} from "./_generated/dataModel";

export default mutation(
  async ({ db, auth }) => {
    console.log('generating some test data!')
    const batchString = 'A'
    const count = 100
    const userIds: Id<'users'>[] = [];
    const goatIds: Id<'goats'>[] = [];
    const noteIds: Id<'notes'>[] = [];
    const boatIds: Id<'boats'>[] = [];
    for (let i of Array.from(Array(count).keys())) {

      const newUserId = await db.insert("users", {
        name: `User ${batchString}${i}`,
        tokenIdentifier: `tokenId${batchString}${i}`,
        noteVotes: new Set<string>()
      })
      userIds.push(newUserId)

      const newGoatId = await db.insert('goats', {
        text: `Goat ${batchString}${i}`,
        voters: []
      })
      goatIds.push(newGoatId)

      const newNoteId = await db.insert('notes', {
        text: `Note ${batchString}${i}`,
      })
      noteIds.push(newNoteId)

      const newBoatId = await db.insert('boats', {
        text: `Boat ${batchString}${i}`,
      })
      boatIds.push(newBoatId)

      if (i % 10 === 0) {
        console.log(`Generated ${i} users, goats, notes, and boats`)
      }
    }

    // Goat votes
    // for each goat, randomly select around 10% of users to vote for it
    for (let goatId of goatIds) {
      const voters = userIds.filter(() => Math.random() > 0.9)
      await db.patch(goatId, {voters})
    }
    console.log('voted for some random goats')

    // Note votes
    // for each user, randomly select around 10% of notes to vote for
    for (let userId of userIds) {
      const selectedNoteIds = noteIds.filter(() => Math.random() > 0.9)
      const rawNoteIds = selectedNoteIds.map(({id}) => id)
      await db.patch(userId, {
        noteVotes: new Set(rawNoteIds)
      })
    }
    console.log('voted for some random notes')


    // Boat votes
    // do something random
    for (let boatId of boatIds) {
      const selectedVoters = userIds.filter(() => Math.random() > 0.9)
      for (let userId of selectedVoters) {
        await db.insert('boatVotes', {
          user: userId,
          boat: boatId
        })
      }
    }
    console.log('voted for some random boats')

  }
)

