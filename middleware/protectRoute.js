import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.token;
  // check for token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied! You need to be logged in to access this page.",
    });
  }

  try {
    // verfiy jwt token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({
        success: false,
        message: "Access denied! Can't verify user",
      });
    }

    const user = User.findById(verified.userID).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    req.user = verified.userID; //User ID gotten from the token.
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
