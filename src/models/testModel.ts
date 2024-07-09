// testModel.ts

import mongoose from "mongoose";

export const testSchema = new mongoose.Schema({
  textField: {
    type: String,
    required: true,
    trim: true, // Automatically trims whitespace
  },
  numberField: {
    type: Number,
    required: true, // Assuming this field is required; adjust as necessary
    // You can also add other options like min, max, default, etc.
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Specify the collection name "test-connection" here
const testModel = mongoose.model("Test", testSchema, "tests");

export default testModel;
