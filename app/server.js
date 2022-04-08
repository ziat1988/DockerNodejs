const { MongoClient } = require("mongodb");
const path = require("path");
const express = require("express");

const app = express();
const router = express.Router();

// use when starting application locally
//let mongoUrlLocal = "mongodb://admin:password@localhost:27017";
// use when starting application as docker container
let mongoUrlDocker = "mongodb://admin:password@mongodb";

async function connectData() {
  let databaseName = "my-test";
  const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

  const client = await MongoClient.connect(mongoUrlDocker, mongoClientOptions);

  const db = client.db(databaseName);
  const items = await db.collection("users").find({}).toArray();
  client.close();

  console.log(items);
  return items;
}

/* app.get("/", (req, res) => {
  res.send({ name: "hello" });
}); */

router.get("/", (req, res) => {
  /*  res.send({ name: "Node mon test3" }); */
  connectData().then((data) => {
    res.send(data);
  });
});

app.get("/favicon.ico", (req, res) => res.status(204));

//add the router
app.use("/", router);

const PORT = 8000;

app.listen(PORT, function () {
  console.log(`server run in port ${PORT}`);
});
