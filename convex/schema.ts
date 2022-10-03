import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  quotes: defineTable({
    text: s.string(),
    votes: s.number(),
  }),
  goats: defineTable({
    text: s.string(),
    voters: s.array(s.id('users'))
  }),
  users: defineTable({
    name: s.string(),
    tokenIdentifier: s.string(),
    noteVotes: s.set(s.string())
  }),
  notes: defineTable({
    text: s.string(),
  }),
  boats: defineTable({
    text: s.string(),
  }),
  boatVotes: defineTable({
    boat: s.id('boats'),
    user: s.id('users')
  })
});