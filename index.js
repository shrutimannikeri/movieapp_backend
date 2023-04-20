// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv"; // to import .env file
import moviesRouter from "./routes/movies_routes.js"
const app = express();

dotenv.config();

const PORT = process.env.PORT;

//mongo conection code

const MONGO_URL = process.env.MONGO_URI;
//const MONGO_URL= "mongodb://127.0.0.1"; //v6

 async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();
//app.use ->interscepts-> applies express.json() ->inbuilt middleware
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use('/movies',moviesRouter)
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
