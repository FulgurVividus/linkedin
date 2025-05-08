import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Get the token
    const token = req.cookies["jwt-linkedin"];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Get the user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Put the user in the request
    req.user = user;

    next();
  } catch (error) {
    console.error(`Error in protectRoute middleware: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
