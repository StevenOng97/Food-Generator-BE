// CRUD

const { MongoClient } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "meme-generator";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to the Database");
    }

    console.log("Connected Correctly!");

    const db = client.db(databaseName);
  }
);
