import { mutation } from './_generated/server'

export default mutation(
  async ({ db }, quoteText: string) => {
    const quoteDoc = await db
      .table('quotes')
      .filter((q) => q.eq(q.field('text'), quoteText))
      .first()
    if (quoteDoc === null) {
      db.insert('quotes', {
        text: quoteText,
        votes: 0,
      })
      // console.log messages appear in your browser's console and the Convex dashboard.
      console.log('Created new Quote.')
    } else {
      console.log(`Quote with text ${quoteText} already exists`)
    }
  }
)
