import mongoose, { Schema } from "mongoose";

export type User = "user" | "admin";

const userSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: [true, "userId is required"],
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  points: {
    type: Number,
    default: 0,
    min: 0,
  },
  addresses: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
