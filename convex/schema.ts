import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  quotes: defineTable({
    text: s.string(),
    votes: s.number(),
  }),
  users: defineTable({
    name: s.string(),
    tokenIdentifier: s.string(),
  }),
});