import type { Movie } from "./movie.types";
import type { User } from "./user.types";

export interface MoviesResponse {
  movies: Movie[];
}

export interface MovieResponse {
  movie: Movie;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface MeResponse {
  user: {
    userId: string;
    role: "user" | "admin";
  };
}