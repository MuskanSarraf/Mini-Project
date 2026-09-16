import { Schema, model } from "mongoose";
import type { IMovie } from "../types/movie.types.js";

const movieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    banner: {
      url: {
        type: String,
        required: true,
      },

      publicId: {
        type: String,
        required: true,
      },
    },

    genre: {
      type: [String],
      required: true,
    },

    language: {
      type: String,
      required: true,
      trim: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    director: {
      type: String,
      required: true,
      trim: true,
    },

    cast: {
      type: [String],
      required: true,
    },

    trailerUrl: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Movie = model<IMovie>("Movie", movieSchema);