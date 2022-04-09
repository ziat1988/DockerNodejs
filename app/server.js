const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const { mongoConnect } = require("./services/mongo");
const app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


async function getData() {
  const { db } = mongoose.connection;
  const items = await db.collection("users").find({}).toArray();
  return items;
}


async function saveUser(data){
  const { db } = mongoose.connection;
  await db.collection("users").insertOne(data)

  return "ok";
}

app.get("/", (req, res) => {
  getData().then((data) => {
    res.send(data);
  });
});

app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.post("/post-data",((req, res) => {
  saveUser(req.body).then(data=>{
    console.log(data)
    res.redirect('/'); // redirect home page
  })
}))

app.get("/favicon.ico", (req, res) => res.status(204));

const PORT = process.env.PORT || 8000;

async function startServer() {
  await mongoConnect();
  app.listen(PORT, function () {
    console.log(`server run in port ${PORT}`);
  });
}

startServer();
