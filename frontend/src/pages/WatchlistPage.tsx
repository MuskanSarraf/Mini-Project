import { useEffect, useState } from "react";

import { getWatchlist } from "../services/user.service";

import type { Movie } from "../types/movie.types";

import MovieCard from "../components/MovieCard";

const WatchlistPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist();

        setMovies(data.movies);
      } catch (error) {
        console.error(error);

        setError("Failed to load watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  if (loading) {
    return <h2>Loading watchlist...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div > 
      <h1>My Watchlist</h1>

      {movies.length === 0 ? (
        <p>
          Your watchlist is empty.
        </p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;