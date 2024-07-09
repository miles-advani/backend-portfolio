// testController.ts

import testModel from "../models/testModel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// get requests: ========================================

export const getServer = async (req, res) => {
  console.log("🔎 getServer called"); // Log when getHello is called
  return res.send("✅ Your server is working fine!"); // Send a response
};

export const getCollection = async (req, res) => {
  console.log("🔎 getDataBase called"); // Log when getDataBase is called
  try {
    const data = await testModel.find(); // Fetch all documents
    console.log("🔎 Fetched data:", data); // Log the fetched data
    return res.json(data); // Send the fetched data as JSON
  } catch (error) {
    console.log("❌ Error in getDataBase:", error); // Log any errors
    // Handle potential errors
    return res
      .status(500)
      .json({ message: "❌ Error fetching data", error: error.message });
  }
};

// post requests: ========================================

export const postCollection = async (req, res) => {
  console.log("🔎 createData called"); // Log when createData is called
  try {
    const data = req.body; // Extract the data from the request body
    console.log("🔎 Creating data:", data); // Log the data being created
    const result = await testModel.create(data); // Create a new document
    console.log("✅ Data created:", result); // Log the created document
    return res.json(result); // Send the created document as JSON
  } catch (error) {
    console.log("❌ Error in createData:", error); // Log any errors
    // Handle potential errors
    return res
      .status(500)
      .json({ message: "❌ Error creating data", error: error.message });
  }
};