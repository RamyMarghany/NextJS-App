import { connectDatabase, insertData } from "../../helpers/db-utility";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid user email!" });
      return;
    }

    // firebase approach
    // const response = await fetch(
    //   "https://nextjs-events-27c8a-default-rtdb.firebaseio.com/emails.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({ email: userEmail }),
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    // await response.json();

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res
        .status(500)
        .json({ message: "connection to the database has been failed!" });
    }

    try {
      await insertData(client, "newsletter", { email: userEmail });
      // to close our database connection
      client.close();
    } catch (error) {
      res.status(500).json({
        message: "inserting the data to the database table has been failed!",
      });
    }

    // close database connection
    client.close();
    res.status(201).json({ message: "signed up!" });
  }
}

export default handler;
