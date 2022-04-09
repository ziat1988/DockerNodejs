const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const { mongoConnect } = require("./services/mongo");
const app = express();

// use when starting application locally
//let mongoUrlLocal = "mongodb://admin:password@localhost:27017";
// use when starting application as docker container
//let mongoUrlDocker = "mongodb://admin:password@mongodb";

async function getData() {
  const { db } = mongoose.connection;
  const items = await db.collection("users").find({}).toArray();
  return items;
}

app.get("/", (req, res) => {
  getData().then((data) => {
    res.send(data);
  });
});

app.get("/favicon.ico", (req, res) => res.status(204));

const PORT = process.env.PORT || 8000;

async function startServer() {
  await mongoConnect();
  app.listen(PORT, function () {
    console.log(`server run in port ${PORT}`);
  });
}

startServer();
