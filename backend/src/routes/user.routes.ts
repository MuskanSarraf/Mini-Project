import { Router } from "express";

import {
  authenticate,
  type AuthRequest,
} from "../middleware/auth.middleware.js";

import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "../controllers/user.controller.js";

const router = Router();

router.get(
  "/me",
  authenticate,
  (req: AuthRequest, res) => {
    res.json({
      user: req.user,
    });
  }
);

router.get(
  "/watchlist",
  authenticate,
  getWatchlist
);

router.post(
  "/watchlist/:movieId",
  authenticate,
  addToWatchlist
);

router.delete(
  "/watchlist/:movieId",
  authenticate,
  removeFromWatchlist
);

export default router;