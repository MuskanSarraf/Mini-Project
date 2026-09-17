import api from "./api";

import type {
  MoviesResponse,
  MovieResponse,
} from "../types/api.types";

export const getMovies = async (): Promise<MoviesResponse> => {
  const response = await api.get<MoviesResponse>(
    "/movies"
  );

  return response.data;
};

export const getMovieById = async (
  id: string
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>(
    `/movies/${id}`
  );

  return response.data;
};

export const deleteMovie = async (
  id: string
): Promise<void> => {
  await api.delete(`/movies/${id}`);
};

export const createMovie = async (
  formData: FormData
): Promise<MovieResponse> => {
  const response = await api.post<MovieResponse>(
    "/movies",
    formData
  );

  return response.data;
};