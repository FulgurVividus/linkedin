import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { sendConnectionRequest } from "../controllers/connection.controller.js";
import { acceptConnectionRequest } from "../controllers/connection.controller.js";
import { rejectConnectionRequest } from "../controllers/connection.controller.js";
import { getConnectionRequests } from "../controllers/connection.controller.js";
import { getUserConnections } from "../controllers/connection.controller.js";
import { removeConnection } from "../controllers/connection.controller.js";
import { getConnectionStatus } from "../controllers/connection.controller.js";

const connectionRouter = Router();

// Path: /api/v1/connections/request/:userId (POST)
connectionRouter.post("/request/:userId", protectRoute, sendConnectionRequest);

// Path: /api/v1/connections/accept/:requestId (PUT)
connectionRouter.put(
  "/accept/:requestId",
  protectRoute,
  acceptConnectionRequest
);

// Path: /api/v1/connections/reject/:requestId (PUT)
connectionRouter.put(
  "/request/:requestId",
  protectRoute,
  rejectConnectionRequest
);

// Path: /api/v1/connections/requests (GET)
// Get all connection requests for the current user
connectionRouter.get("/requests", protectRoute, getConnectionRequests);

// Path: /api/v1/connections/ (GET)
// Get all connections for a user
connectionRouter.get("/", protectRoute, getUserConnections);

// Path: /api/v1/connections/:userId (DELETE)
connectionRouter.delete("/:userId", protectRoute, removeConnection);

// Path: /api/v1/connections/status/:userId (GET)
connectionRouter.get("/status/:userId", protectRoute, getConnectionStatus);

export default connectionRouter;
