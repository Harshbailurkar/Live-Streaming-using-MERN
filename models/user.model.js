import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    imageUrl: {
      type: String,
    },
    externalId: {
      type: String,
    },
    bio: {
      type: String,
    },
    stream: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stream",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
