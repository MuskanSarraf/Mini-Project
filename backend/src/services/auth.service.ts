import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: "user" | "admin";
}

export const generateToken = (
  userId: string,
  role: "user" | "admin"
): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  const payload: JwtPayload = {
    userId,
    role,
  };

  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
};