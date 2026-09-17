import type { Response } from "express";

import { User } from "../models/user.model.js";
import { Movie } from "../models/movie.model.js";

import type { AuthRequest } from "../middleware/auth.middleware.js";

export const addToWatchlist = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      res.status(404).json({
        message: "Movie not found",
      });
      return;
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    if (movieId === undefined) {
      res.status(400).json({
        message: "Movie ID is required",
      });
      return;
    }
    if (Array.isArray(movieId)) {
      res.status(400).json({
        message: "Invalid movie ID",
      });
      return;
    }

    if (user.watchlist.includes(movieId)) {
      res.status(400).json({
        message: "Movie is already in watchlist",
      });
      return;
    }

    user.watchlist.push(movieId);

    await user.save();

    res.status(200).json({
      message: "Movie added to watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add movie to watchlist",
    });
  }
};

export const removeFromWatchlist = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const { movieId } = req.params;

    const user = await User.findById(req.user.userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    if (movieId === undefined) {
      res.status(400).json({
        message: "Movie ID is required",
      });
      return;
    }
    if (Array.isArray(movieId)) {
      res.status(400).json({
        message: "Invalid movie ID",
      });
      return;
    }
    
    const isInWatchlist =
      user.watchlist.includes(movieId);

    if (!isInWatchlist) {
      res.status(400).json({
        message: "Movie is not in watchlist",
      });
      return;
    }

    user.watchlist = user.watchlist.filter(
      (id) => id !== movieId
    );

    await user.save();

    res.status(200).json({
      message: "Movie removed from watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to remove movie from watchlist",
    });
  }
};

export const getWatchlist = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const movies = await Movie.find({
      _id: {
        $in: user.watchlist,
      },
    });

    res.status(200).json({
      movies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch watchlist",
    });
  }
};