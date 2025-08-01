import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

//# signup
export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // new user
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      username: username,
    });
    await user.save();

    // token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // setting token to the cookie
    res.cookie("jwt-linkedin", token, {
      httpOnly: true, // prevents XXS attacks
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      sameSite: "strict", // prevents CSRF attacks
      secure: process.env.NODE_ENV === "production", // prevents man-in-the-middle attacks
    });

    res.status(201).json({ message: "User registered successfully" });

    // email
    const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username;

    try {
      await sendWelcomeEmail(user.email, user.name, profileUrl);
    } catch (emailError) {
      console.log(`Error in sending Welcome Email: ${emailError.message}`);
    }
  } catch (error) {
    console.log(`Error in signup: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//# login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and send token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    await res.cookie("jwt-linkedin", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(`Error in login controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//# logout
export const logout = async (req, res) => {
  res.clearCookie("jwt-linkedin");
  res.json({ message: "Logged out successfully" });
};

//# getCurrentUser
export const getCurrentUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error(`Error in getCurrentUser controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
