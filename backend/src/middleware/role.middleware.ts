import type { NextFunction, Response } from "express";
import type { AuthRequest } from "./auth.middleware.js";

type UserRole = "user" | "admin";

export const authorize = (
  ...allowedRoles: UserRole[]
) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({
        message: "Authentication required",
      });

      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        message: "Access denied",
      });

      return;
    }

    next();
  };
};