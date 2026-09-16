import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import dotenv from "dotenv";


dotenv.config();

import authRouter from "./routes/auth.routes.js";
import movieRouter from "./routes/movie.routes.js"

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies",movieRouter)
app.get("/", (_req, res) => {
  res.json({
    message: "MovieHub API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDatabase()
  console.log(`Server running on http://localhost:${PORT}`);
});