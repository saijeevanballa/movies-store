import http from "./httpService";
import { getGenres } from "./genreService";

const moviesbaseUrl = `${http.baseUrl}/api/movies`;

export async function getMovies() {
  return await http.get(moviesbaseUrl);
}

export async function deleteMovie(id) {
  return await http.delete(`${moviesbaseUrl}/${id}`);
}

export async function getMovie(id) {
  return await http.get(`${moviesbaseUrl}/${id}`);
}

export async function saveMovie(movie) {
  let movieInDb = {};
  movieInDb.title = movie.name;
  movieInDb.genreId = movie.genreId;
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  return movie._id
    ? await http.put(`${moviesbaseUrl}/${movie._id}`, movieInDb)
    : await http.post(`${moviesbaseUrl}`, movieInDb);
}
