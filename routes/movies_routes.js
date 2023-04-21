import express from "express"
import { getAllMovies, createMovie, searchMovie, deleteMovie, updateMovie } from "../dbQuery.js";

const router=express.Router()


//list of movies
router.get("/movies", async function (request, response) {
    //querypart
  
    const qury = request.query;
    if (qury.rating) {
      qury.rating = +qury.rating;
    }
    console.log(request.query);
    //find not give array
    //cursor-> its pagination-toArray()
    const movieslist = await getAllMovies(qury);
    response.send(movieslist);
  });
  
  //create movie
  //express.json->middleware--because it sit between data and callback .its inbuit middleware
  
  router.post("/movies", async function (request, response) {
    const data = request.body;
    console.log(data);
    // db.movies.insertMany(data)
    const result = await createMovie(data);
    response.send(result);
  });
  
  //get mobie by id
  
  router.get("/movies/:id", async function (request, response) {
    const { id } = request.params;
  console.log(id)
    const mv = await searchMovie(id);
    //find will return perticular one
  console.log(mv)
    //if nmovie not found we have to set status code 404
    mv
      ? response.send(mv)
      : response.status(404).send({ msg: "movie not found" });
  });
  
  //delet movie
  router.delete("/movies/:id", async function (request, response) {
    const { id } = request.params;
   
    const result = await deleteMovie(id);
      result.deletedCount > 0
      ? response.send({msg: "Movie successfully deleteted"})
      : response.status(404).send({ msg: "movie not found" });
  });
  
  //update movie
  router.put("/movies/:id", async function (request, response) {
    const { id } = request.params;
    const data = request.body;
    const mv = await updateMovie(id, data);
    //find will return perticular one
  
    //if nmovie not found we have to set status code 404
    mv
      ? response.send(mv)
      : response.status(404).send({ msg: "movie not found" });
  });
  export default router


