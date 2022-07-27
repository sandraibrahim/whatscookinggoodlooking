// Dependencies.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Server Variables.
const app = express();
const apiPort = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());  
app.use(bodyParser.json());

// Mongo Database.
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

// Server Routing.
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
