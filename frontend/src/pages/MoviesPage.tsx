import { useEffect, useState } from "react";

import { getMovies } from "../services/movie.service";

import type { Movie } from "../types/movie.types";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();

        setMovies(data.movies);
      } catch (error) {
        console.error(error);

        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <h2>Loading movies...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Movies</h1>

      {movies.map((movie) => (
        <div key={movie._id}>
          <h2>{movie.title}</h2>

          <img
            src={movie.banner.url}
            alt={movie.title}
            width="200"
          />

          <p>{movie.description}</p>

          <p>Rating: {movie.rating}/10</p>
        </div>
      ))}
    </div>
  );
};

export default MoviesPage;