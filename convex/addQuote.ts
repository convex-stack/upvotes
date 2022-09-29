import {DatabaseWriter, mutation} from './_generated/server'
import {DataModel, TableNames} from "./_generated/dataModel";

export default mutation(
  async ({ db }, quoteText: string) => {
    await addTopic(db, 'quotes', quoteText, {votes: 0})
  }
)

export async function addTopic(db: DatabaseWriter, tableName: TableNames, topicText: string, defaultFields: any) {
  const quoteDoc = await db
    .table(tableName)
    .filter((q) => q.eq(q.field('text'), topicText))
    .first()
  if (quoteDoc === null) {
    db.insert(tableName, {
      text: topicText,
      ...defaultFields
    })
    console.log(`Created 1 new ${tableName}.`)
  } else {
    console.log(`${tableName} with text ${topicText} already exists`)
  }
}
