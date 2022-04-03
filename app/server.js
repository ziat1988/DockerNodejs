const { MongoClient } = require("mongodb");
const path = require("path");
const express = require("express");

const app = express();
const router = express.Router();

async function connectData() {
  const mongoUrlLocal = "mongodb://admin:password@localhost:27017";
  let databaseName = "my-test";
  const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

  const client = await MongoClient.connect(mongoUrlLocal, mongoClientOptions);

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
  res.send({ name: "dang trinh" });
  /*0
  connectData().then((data) => {
    res.send(data);
  });
  */
});

app.get("/favicon.ico", (req, res) => res.status(204));

//add the router
app.use("/", router);

const PORT = 8000;

app.listen(PORT, function () {
  console.log(`server run in port ${PORT}`);
});
