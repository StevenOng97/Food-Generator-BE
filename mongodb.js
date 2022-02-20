// CRUD

const { MongoClient } = require("mongodb");

const databaseName = "food-generator";

MongoClient.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to the Database");
    }

    console.log("Connected Correctly!");

    const db = client.db(databaseName);
  }
);
