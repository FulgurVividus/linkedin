import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserNotifications } from "../controllers/notification.controller.js";
import { markNotificationAsRead } from "../controllers/notification.controller.js";
import { deleteNotification } from "../controllers/notification.controller.js";

const notificationRouter = Router();

// Path: /api/v1/notifications/ (GET)
notificationRouter.get("/", protectRoute, getUserNotifications);

// Path: /api/v1/notifications/:id/read (PUT)
notificationRouter.put("/:id/read", protectRoute, markNotificationAsRead);

// Path: /api/v1/notifications/:id (DELETE)
notificationRouter.delete("/:id", protectRoute, deleteNotification);

export default notificationRouter;
