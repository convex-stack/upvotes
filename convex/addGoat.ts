import { mutation } from './_generated/server'

export default mutation(
  async ({ db }, goatText: string) => {
    const goatDoc = await db
      .table('goats')
      .filter((q) => q.eq(q.field('text'), goatText))
      .first()
    if (goatDoc === null) {
      db.insert('goats', {
        text: goatText,
        voters: []
      })
      // console.log messages appear in your browser's console and the Convex dashboard.
      console.log('Created new Goat.')
    } else {
      console.log(`Goat with text ${goatText} already exists`)
    }
  }
)
