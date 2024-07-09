// app.ts

// Imports =========================================

import express from "express";
// Middleware ---
// import cors from 'cors';
import { logMiddleware } from "./middleware/logMiddleware.js"; // Custom middleware
// import { testMiddleware } from "./middleware/testMiddleware.js"; // Custom middleware
import { dbMiddleware } from "./middleware/dbMiddleware.js"; // Custom middleware
// Routes ---
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware ======================================

app.use(express.json()); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

// app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing): allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.

// app.use(testMiddleware); // Hello from testMiddleware

app.use(logMiddleware); // Log details of incoming requests

app.use(dbMiddleware); // Call the connect function based on the db name extracted from the request headers

// Routes ==========================================

app.use("/test", testRoutes);

app.use("/user", userRoutes);

// Export app ======================================

export default app;
