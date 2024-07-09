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
import jwt, { JwtPayload } from "jsonwebtoken";

// Middleware
export default async (req, res, next) => {
  try {
    // Attempt to retrieve the token from the Authorization header or a custom token header
    const token =
      req.header("token") || req?.headers?.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Access Denied");

    // Verify and decode the token. Replace "randomString" with your secret or public key
    const decoded = jwt.verify(token, "randomString") as JwtPayload & {
      user: any;
      sub: any;
    };

    // Attach user information to the request. This could be adjusted based on the token's payload structure
    if (decoded.user) {
      req.user = decoded.user; // For general JWT logins
    } else if (decoded.sub) {
      req.googleId = decoded.sub; // Specifically for Google logins, where `sub` is the Google ID
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(403).send("Invalid token!");
  }
};
