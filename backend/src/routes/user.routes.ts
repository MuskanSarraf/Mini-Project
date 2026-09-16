import { Router } from "express";
import {
  authenticate,
  type AuthRequest,
} from "../middleware/auth.middleware.js";

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

export default router;