import { Link } from "react-router-dom";

import type { Movie } from "../types/movie.types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <article className="movie-card">
      <img
        src={movie.banner.url}
        alt={movie.title}
      />

      <div>
        <h2>{movie.title}</h2>

        <p>
          {movie.genre.join(" • ")}
        </p>

        <p>
          ⭐ {movie.rating}/10
        </p>

        <p>
          {movie.language} •{" "}
          {movie.duration} min
        </p>

        <Link to={`/movies/${movie._id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
};

export default MovieCard;