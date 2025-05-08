import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { logout } from "../controllers/auth.controller.js";
import { getCurrentUser } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = Router();

// Path: /api/v1/auth/signup (POST)
authRouter.post("/signup", signup);

// Path: /api/v1/auth/login (POST)
authRouter.post("/login", login);

// Path: /api/v1/auth/logout (POST)
authRouter.post("/logout", logout);

// Path: /api/v1/auth/me (GET)
authRouter.get("/me", protectRoute, getCurrentUser);

export default authRouter;
