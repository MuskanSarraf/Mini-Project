import { Schema, model } from "mongoose";
import type { IUser } from "../types/user.types.js";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    watchlist: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);