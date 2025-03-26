import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    tokens: {
      type: Number,
      default: 500,
    },
    profilePicture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;