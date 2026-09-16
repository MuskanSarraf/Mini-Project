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

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("admin"),
    createMovie
);

export default router;