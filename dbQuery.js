import { client } from "./index.js";

export async function updateMovie(id, data) {
    return await client
        .db("Movieapp")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}
export async function createMovie(data) {
    return await client
        .db("Movieapp")
        .collection("movies")
        .insertMany(data);
}
export async function deleteMovie(id) {
    return await client
        .db("Movieapp")
        .collection("movies")
        .deleteOne({ id: id });
}
export async function searchMovie(id) {
    return await client
        .db("Movieapp")
        .collection("movies")
        .findOne({ id: id });
}
export async function getAllMovies(qury) {
    return await client
        .db("Movieapp")
        .collection("movies")
        .find(qury)
        .toArray();
}
