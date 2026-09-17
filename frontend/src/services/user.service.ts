import api from "./api";

import type { MoviesResponse } from "../types/api.types";

export const getWatchlist = async (): Promise<MoviesResponse> => {
    const response = await api.get<MoviesResponse>(
        "/users/watchlist"
    );

    return response.data;
};

export const addToWatchlist = async (
    movieId: string
): Promise<void> => {
    await api.post(`/users/watchlist/${movieId}`);
};

export const removeFromWatchlist = async (
    movieId: string
): Promise<void> => {
    await api.delete(`/users/watchlist/${movieId}`);
};