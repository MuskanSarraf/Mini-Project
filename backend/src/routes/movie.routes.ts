import { Router } from "express";
import {
    createMovie,
} from "../controllers/movie.controller.js";
import {
    authenticate,
} from "../middleware/auth.middleware.js";
import {
    authorize,
} from "../middleware/role.middleware.js";
import upload from "../config/multer.js"

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("admin"),
    upload.single("banner"),
    createMovie
);

export default router;