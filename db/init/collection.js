var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("WCGL");

  // Create User Table.
  dbo.createCollection("users", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });

  // Create Ingredients Table.
  dbo.createCollection("ingredients", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });

  // Create Recipes Table.
  dbo.createCollection("recipes", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });

  // Create Affirmations Table.
  dbo.createCollection("affirmations", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
