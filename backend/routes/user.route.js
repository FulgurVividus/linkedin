import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections } from "../controllers/user.controller.js";
import { getPublicProfile } from "../controllers/user.controller.js";
import { updateProfile } from "../controllers/user.controller.js";

const userRouter = Router();

// Path: /api/v1/users/suggestions (GET)
userRouter.get("/suggestions", protectRoute, getSuggestedConnections);

// Path: /api/v1/users/:username (GET)
userRouter.get("/:username", protectRoute, getPublicProfile);

// Path: /api/v1/users/profile (PUT)
userRouter.put("/profile", protectRoute, updateProfile);

export default userRouter;
