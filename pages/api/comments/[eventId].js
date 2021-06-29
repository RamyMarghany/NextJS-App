import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    "mongodb+srv://ramy:mongo007@cluster0.sismo.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    // server side validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid user input!" });
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    await db.collection("comments").insertOne(newComment);

    res.status(201).json({ message: "comment Added!", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();

    // connect the database and collect the comments table(collection), return all data in the record, sort it by id, select sort by ass, and return the data in array shape.
    const comments = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(201).json({ comments });
  }

  // close database connection at the end of the code
  client.close();
}

export default handler;
