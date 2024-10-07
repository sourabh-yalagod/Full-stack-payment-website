import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "fullname is required . . . !"],
    },
    email: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required . . . !"],
    },
    jwtToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
