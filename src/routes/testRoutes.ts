// testRoutes.ts

// Imports ==============================================

import express from "express";
import {
  getServer,
  getCollection,
  postCollection,
} from "../controllers/testController.js";
// import { logMiddleware } from "../middleware/logMiddleware.js";
// import { testMiddleware } from "../middleware/testMiddleware.js";
// import { dbMiddleware } from "../middleware/dbMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Custom middleware

const router = express.Router();

// // middleware: ==========================================

// // Use the test middleware
// router.use(testMiddleware);

// // Use the log middleware
// router.use(logMiddleware);

// // Use the database middleware:
// // Call the connect function based on the db name extracted from the request headers
// router.use(dbMiddleware);

// server ==============================================

// Test Server
// http://127.0.0.1:5001/test/server/
router.get("/server", getServer);

// collection ===========================================

// Test DataBase
// http://127.0.0.1:5001/test/collection/
router.get("/collection", getCollection);

// Create Test Data
// http://127.0.0.1:5001/test/collection/
router.post("/collection",authMiddleware, postCollection);

// export router: ========================================

export default router;
