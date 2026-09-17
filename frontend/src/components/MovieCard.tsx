import { Link } from "react-router-dom";

import type { Movie } from "../types/movie.types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div>
      <img
        src={movie.banner.url}
        alt={movie.title}
        width="250"
      />

      <h2>{movie.title}</h2>

      <p>{movie.rating}/10</p>

      <p>{movie.genre.join(", ")}</p>

      <Link to={`/movies/${movie._id}`}>
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;