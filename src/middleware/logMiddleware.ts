// // logMiddleware.ts
// // A middleware function for logging details of incoming requests

// // Imports =========================================

// import { Request, Response, NextFunction } from "express"; // Import types from Express

// // Middleware ======================================

// export const logMiddleware = (
//   req: Request, // The request object, containing details about the HTTP request
//   res: Response, // The response object, which will be used to send a response back to the client
//   next: NextFunction // A callback function to pass control to the next middleware function in the stack
// ) => {
//   console.log(`📩 Incoming request: ${req.method} ${req.path}`); // Log the HTTP method and path of the incoming request to the console

//   const databaseName = req.headers["x-database-name"]; // Get the value of the x-database-name header from the request
//   console.log("🔎 Request Headers:", req.headers); // Log the entire request headers

//   if (databaseName) {
//     console.log(`🔎 x-database-name: ${databaseName}`); // If the header exists, log its value
//   } else {
//     console.log("🔎 No x-database-name header found"); // If the header does not exist, log that no header was found
//   }

//   next(); // Call the next() function to continue processing the request with the next middleware
// };

// ==========================================

// logMiddleware.ts
// Enhanced middleware function for detailed logging of incoming requests and responses

import { Request, Response, NextFunction } from "express";

export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now(); // Capture the start time of the request
  console.log(`📩 Incoming request: ${req.method} ${req.path}`); // Log the HTTP method and path

  // Enhanced logging for request headers, including conditional logging for specific headers
  const databaseName = req.headers["x-database-name"];
  console.log("🔎 Request Headers:", req.headers);
  if (databaseName) {
    console.log(`🔎 x-database-name: ${databaseName}`);
  } else {
    console.log("🔎 No x-database-name header found");
  }

  // Wrap the original res.send method to log when the response is sent
  const originalSend = res.send.bind(res);
  res.send = (...args) => {
    const duration = Date.now() - start; // Calculate the duration of the request
    console.log(`✅ Response sent for ${req.method} ${req.path} in ${duration}ms`);
    return originalSend(...args); // Call the original send method with all arguments
  };

  next(); // Proceed to the next middleware
};
