import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Avoid recompiling model on hot reload
export default mongoose.models.User || mongoose.model("User", UserSchema);
