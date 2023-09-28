var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING =
  "mongodb+srv://admin:3aNVj7bYnY2yqFb0@cluster0.cl3aycg.mongodb.net/?retryWrites=true&w=majority";

var DATABASENAME = "mercados-mediavales";

var database;

app.listen(5038, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASENAME);
    console.log("Conectado");
  });
});

app.get("/api/mercados-mediavales/get-mercados", (request, response) => {
  database
    .collection("mercados-mediavales-collection")
    .find({})
    .toArray((error, result) => {
      response.send(result);
    });
});

app.post(
  "/api/mercados-mediavales/add-mercados",
  multer().none(),
  (request, response) => {
    database
      .collection("mercados-mediavales-collection")
      .count({}, function (error, numOfDocs) {
        database.collection("mercados-mediavales-collection").insertOne({
          name: (numOfDocs + 1).toString(),
          name: request.body.name,
        });
        response.json("Add corrrecto");
      });
  }
);

app.delete("/api/mercados-mediavales/delete-mercado", (request, response) => {
  database.collection("mercados-mediavales-collection").deleteOne({
    name: request.query.name,
  });
  response.json("Delete correcto");
});
