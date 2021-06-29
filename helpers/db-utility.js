import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // the connection with MongoDB require this way
  // ramy => is the database username
  // mongo007 => is the password of the database
  // events => is the database name
  const client = await MongoClient.connect(
    "mongodb+srv://ramy:mongo007@cluster0.sismo.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertData(client, collection, insertedData) {
  // to get access to the database
  const db = client.db();

  // in Mongo world the collection is the table, so in our `events` database we have our `newsletter` table, and each record has an `email`
  const result = await db.collection(collection).insertOne(insertedData);

  return result;
}
