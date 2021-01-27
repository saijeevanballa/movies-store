import http from "./httpService";

const moviesbaseUrl = `${http.baseUrl}/api/movies`;

export async function getMovies() {
  return await http.get(moviesbaseUrl);
}

export async function deleteMovie(id) {
  return await http.delete(`${moviesbaseUrl}/${id}`);
}
