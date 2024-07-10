// // authMiddleware.ts
// //single function to verify token

// // Imports =========================================

// // import jwt from "jsonwebtoken"; // without typescript
// import jwt, { JwtPayload } from "jsonwebtoken";

// // Middleware ======================================

// export default (req, res, next) => {
//   try {
//     const token = req.header("token");
//     if (!token) return res.status(401).send("Access Denied");
//     // const decode = jwt.verify(token, "randomString"); // without typescript
//     const decode = jwt.verify(token, "randomString") as JwtPayload & {
//       user: any;
//     };
//     req.user = decode.user;
//     next();
//   } catch (error) {
//     res.send("Invalid token!");
//   }
// };

// ==========================================

// import jwt from "jsonwebtoken";

// const auth = async (req, res, next) => {
//   try {
//     const token = req?.headers?.authorization?.split(" ")[1];
//     if (token) {
//       let decodedData = jwt.decode(token);
//       req.googleId = decodedData.sub;
//     }
//     console.log("User not logged in!");
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default auth;

// ==========================================

// authMiddleware.ts
// Optimized middleware to verify token and handle both Google logins and other JWT-based logins

// Imports
import dotenv from "dotenv";
dotenv.config();
import jwt, { JwtPayload } from "jsonwebtoken";

// Middleware
export default async (req, res, next) => {
  try {
    // Attempt to retrieve the token from the Authorization header or a custom token header
    const token =
      req.header("token") || req?.headers?.authorization?.split(" ")[1]; // Check both headers for the token
    if (!token) return res.status(401).send("Access Denied"); // If no token is found, send a 401 Unauthorized response

    // Verify and decode the token. Use the JWT_SECRET environment variable for verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & { 
      user: any; // For general JWT logins
      sub: any; // Specifically for Google logins
    };

    // Attach user information to the request. This could be adjusted based on the token's payload structure
    if (decoded.user) {
      req.user = decoded.user; // For general JWT logins
    } else if (decoded.sub) {
      req.googleId = decoded.sub; // Specifically for Google logins, where `sub` is the Google ID
    }

    next(); // Proceed to the next middleware
  } catch (error) { // Handle any errors during token verification
    console.error(error); // Log the error for debugging purposes
    res.status(403).send("Invalid token!"); // Send a 403 Forbidden response
  }
};
