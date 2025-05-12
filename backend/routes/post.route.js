import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getFeedPosts } from "../controllers/post.controller.js";
import { createPost } from "../controllers/post.controller.js";
import { deletePost } from "../controllers/post.controller.js";
import { getPostById } from "../controllers/post.controller.js";
import { createComment } from "../controllers/post.controller.js";
import { likePost } from "../controllers/post.controller.js";

const postRouter = Router();

// Path: /api/v1/posts/ (GET)
postRouter.get("/", protectRoute, getFeedPosts);

// Path: /api/v1/posts/create (POST)
postRouter.post("/create", protectRoute, createPost);

// Path: /api/v1/posts/delete/:id (DELETE)
postRouter.delete("/delete/:id", protectRoute, deletePost);

// Path: /api/v1/posts/:id (GET)
postRouter.get("/:id", protectRoute, getPostById);

// Path: /api/v1/posts/:id/comment (POST)
postRouter.post("/:id/comment", protectRoute, createComment);

// Path: /api/v1/posts/:id/like (POST)
postRouter.post("/:id/like", protectRoute, likePost);

export default postRouter;
