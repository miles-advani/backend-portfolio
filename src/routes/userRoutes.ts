// userRoutes.ts

// Imports =========================================

import express from "express";
// Controllers ---
import {
  userLogin,
  userSignup,
  cookieUser,
  loggedIn,
  getProducts,
  //   getUsers,
  //   deleteUser,
} from "../controllers/userController.js";
// Middleware ---
import authMiddleware from "../middleware/authMiddleware.js"; // Custom middleware

// Routes ==========================================

const router = express.Router();

//CRUD - Create (POST request), Read (GET request), Update (put, patch, update request/s), Delete (DELETE request)

// Signup
// http://localhost:5001/user/signup/
// http://127.0.0.1:5001/user/signup/
router.post("/signup", userSignup);

//Login
// http://localhost:5001/user/login/
// http://127.0.0.1:5001/user/login/
router.post("/login", userLogin);

//loggedIn
// http://localhost:5001/user/profile/
// http://127.0.0.1:5001/user/profile/
router.get("/profile", authMiddleware, loggedIn);

//Cookie
// http://localhost:5001/user/
// http://127.0.0.1:5001/user/
router.get("/", cookieUser);

//get cookies
// http://localhost:5001/user/products/
// http://127.0.0.1:5001/user/products/
router.get("/products", getProducts);

// new !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//Get users
//http://localhost:5000/get-users
// router.get("/get-users", auth, getUsers);

//delete user
// router.delete("/:id", auth, deleteUser);

// Export ==========================================

export default router;
