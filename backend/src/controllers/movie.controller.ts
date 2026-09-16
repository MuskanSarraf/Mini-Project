import type { Response } from "express";
import { Movie } from "../models/movie.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

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

        const movie = await Movie.create({
            title,
            description,

            banner: {
                url: "",
                publicId: "",
            },

            genre,
            language,
            releaseDate,
            duration,
            rating,
            director,
            cast,
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