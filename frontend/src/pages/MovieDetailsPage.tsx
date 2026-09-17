import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getMovieById } from "../services/movie.service";

import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "../services/user.service";

import type { Movie } from "../types/movie.types";

const MovieDetailsPage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);

  const [isInWatchlist, setIsInWatchlist] =
    useState(false);

  const [loading, setLoading] = useState(true);

  const [watchlistLoading, setWatchlistLoading] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) {
        setError("Movie ID is missing");
        setLoading(false);
        return;
      }

      try {
        const movieData = await getMovieById(id);

        setMovie(movieData.movie);

        const watchlistData = await getWatchlist();

        const alreadyAdded =
          watchlistData.movies.some(
            (movie) => movie._id === id
          );

        setIsInWatchlist(alreadyAdded);
      } catch (error) {
        console.error(error);

        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleWatchlist = async () => {
    if (!id) {
      return;
    }

    try {
      setWatchlistLoading(true);

      if (isInWatchlist) {
        await removeFromWatchlist(id);

        setIsInWatchlist(false);
      } else {
        await addToWatchlist(id);

        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setWatchlistLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading movie...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  return (
    <div>
      <Link to="/movies">
        ← Back to Movies
      </Link>

      <div>
        <img
          src={movie.banner.url}
          alt={movie.title}
          width="500"
        />

        <div>
          <h1>{movie.title}</h1>

          <p>{movie.description}</p>

          <p>
            Rating: {movie.rating}/10
          </p>

          <p>
            Genre: {movie.genre.join(", ")}
          </p>

          <p>
            Language: {movie.language}
          </p>

          <p>
            Duration: {movie.duration} minutes
          </p>

          <p>
            Release Date:{" "}
            {new Date(
              movie.releaseDate
            ).toLocaleDateString()}
          </p>

          <p>
            Director: {movie.director}
          </p>

          <p>
            Cast: {movie.cast.join(", ")}
          </p>

          <button
            onClick={handleWatchlist}
            disabled={watchlistLoading}
          >
            {watchlistLoading
              ? "Updating..."
              : isInWatchlist
                ? "Remove from Watchlist"
                : "Add to Watchlist"}
          </button>

          <br />
          <br />

          <a
            href={movie.trailerUrl}
            target="_blank"
            rel="noreferrer"
          >
            Watch Trailer
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;