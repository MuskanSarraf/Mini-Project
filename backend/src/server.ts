import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database.js";
import dotenv from "dotenv";


dotenv.config();

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);

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