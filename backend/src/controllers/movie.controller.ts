import type { Response } from "express";
import { Movie } from "../models/movie.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { uploadImage } from "../services/cloudinary.service.js";
import cloudinary from "../config/cloudinary.js";

export const createMovie = async (
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

    if (!req.file) {
      res.status(400).json({
        message: "Movie banner is required",
      });

      return;
    }

    const {
      title,
      description,
      genre,
      language,
      releaseDate,
      duration,
      rating,
      director,
      cast,
      trailerUrl,
    } = req.body;

    if (
      !title ||
      !description ||
      !genre ||
      !language ||
      !releaseDate ||
      !duration ||
      rating === undefined ||
      !director ||
      !cast ||
      !trailerUrl
    ) {
      res.status(400).json({
        message: "All movie fields are required",
      });

      return;
    }

    const uploadResult = await uploadImage(
      req.file.buffer
    );

    const movie = await Movie.create({
      title,
      description,

      banner: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },

      genre,
      language,
      releaseDate,
      duration: Number(duration),
      rating: Number(rating),
      director,
      cast:
        typeof cast === "string"
          ? JSON.parse(cast)
          : cast,
      trailerUrl,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      message: "Movie created successfully",
      movie,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create movie",
    });
  }
};

export const getMovies = async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const movies = await Movie.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      movies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch movies",
    });
  }
};

export const getMovieById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      res.status(404).json({
        message: "Movie not found",
      });

      return;
    }

    res.status(200).json({
      movie,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch movie",
    });
  }
};

export const updateMovie = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      res.status(404).json({
        message: "Movie not found",
      });

      return;
    }

    const {
      title,
      description,
      genre,
      language,
      releaseDate,
      duration,
      rating,
      director,
      cast,
      trailerUrl,
    } = req.body;

    if (title !== undefined) {
      movie.title = title;
    }

    if (description !== undefined) {
      movie.description = description;
    }

    if (genre !== undefined) {
      movie.genre =
        typeof genre === "string"
          ? JSON.parse(genre)
          : genre;
    }

    if (language !== undefined) {
      movie.language = language;
    }

    if (releaseDate !== undefined) {
      movie.releaseDate = releaseDate;
    }

    if (duration !== undefined) {
      movie.duration = Number(duration);
    }

    if (rating !== undefined) {
      movie.rating = Number(rating);
    }

    if (director !== undefined) {
      movie.director = director;
    }

    if (cast !== undefined) {
      movie.cast =
        typeof cast === "string"
          ? JSON.parse(cast)
          : cast;
    }

    if (trailerUrl !== undefined) {
      movie.trailerUrl = trailerUrl;
    }

    if (req.file) {
      const oldPublicId = movie.banner.publicId;

      const uploadResult = await uploadImage(
        req.file.buffer
      );

      movie.banner = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };

      await cloudinary.uploader.destroy(oldPublicId);
    }

    await movie.save();

    res.status(200).json({
      message: "Movie updated successfully",
      movie,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update movie",
    });
  }
};

export const deleteMovie = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      res.status(404).json({
        message: "Movie not found",
      });

      return;
    }

    await cloudinary.uploader.destroy(
      movie.banner.publicId
    );

    await movie.deleteOne();

    res.status(200).json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete movie",
    });
  }
};