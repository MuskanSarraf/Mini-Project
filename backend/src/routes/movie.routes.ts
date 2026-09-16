import { Router } from "express";

import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";

import {
  authenticate,
} from "../middleware/auth.middleware.js";

import {
  authorize,
} from "../middleware/role.middleware.js";

import upload from "../config/multer.js";

const router = Router();

// Anyone logged in can view movies
router.get(
  "/",
  authenticate,
  getMovies
);

router.get(
  "/:id",
  authenticate,
  getMovieById
);

// Only admin can create
router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.single("banner"),
  createMovie
);

// Only admin can update
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  upload.single("banner"),
  updateMovie
);

// Only admin can delete
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteMovie
);

export default router;