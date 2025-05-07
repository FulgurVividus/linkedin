import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { logout } from "../controllers/auth.controller.js";

const authRouter = Router();

// Path: /api/v1/auth/signup (POST)
authRouter.post("/signup", signup);

// Path: /api/v1/auth/login (POST)
authRouter.post("/login", login);

// Path: /api/v1/auth/logout (POST)
authRouter.post("/logout", logout);

export default authRouter;
