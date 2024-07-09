//  userModel.ts

// Imports =========================================

import mongoose from "mongoose";

// Schema ==========================================

export const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String, // Optional
});

const userModel = mongoose.model("User", userSchema, "users");

// Export ==========================================

export default userModel;
