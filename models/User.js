import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
});

export const User = mongoose.model("User", userSchema);
