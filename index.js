// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv"; // to import .env file
const app = express();
const PORT = 4000;
dotenv.config();



//mongo conection code

const MONGO_URL = process.env.MONGO_URL;
//const MONGO_URL= "mongodb://127.0.0.1"; //v6

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

const client = await createConnection();
//app.use ->interscepts-> applies express.json() ->inbuilt middleware
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

//list of movies
app.get("/movies", async function (request, response) {
  //querypart

  const qury = request.query;
  if (qury.rating) {
    qury.rating = +qury.rating;
  }
  console.log(request.query);
  //find not give array
  //cursor-> its pagination-toArray()
  const movieslist = await client
    .db("Movieapp")
    .collection("movies")
    .find(qury)
    .toArray();
  response.send(movieslist);
});

//create movie
//express.json->middleware--because it sit between data and callback .its inbuit middleware

app.post("/movies", async function (request, response) {
  const data = request.body;
  console.log(data);
  // db.movies.insertMany(data)
  const result = await client
    .db("Movieapp")
    .collection("movies")
    .insertMany(data);
  response.send(result);
});

//get mobie by id

app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;

  const mv = await client
    .db("Movieapp")
    .collection("movies")
    .findOne({ id: id });
  //find will return perticular one

  //if nmovie not found we have to set status code 404
  mv
    ? response.send(mv)
    : response.status(404).send({ msg: "movie not found" });
});

//delet movie
app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;
 
  const result = await client
    .db("Movieapp")
    .collection("movies")
    .deleteOne({ id: id });
    result.deletedCount > 0
    ? response.send({msg: "Movie successfully deleteted"})
    : response.status(404).send({ msg: "movie not found" });
});

//update movie
app.put("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  const mv = await client
    .db("Movieapp")
    .collection("movies")
    .updateOne({ id: id },{$set: data});
  //find will return perticular one

  //if nmovie not found we have to set status code 404
  mv
    ? response.send(mv)
    : response.status(404).send({ msg: "movie not found" });
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
