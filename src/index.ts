// index.ts

// Imports ==============================================
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import db from "./db.js";

// Server Function =======================================

const startServer = async () => {
  const PORT = process.env.PORT || 5000;

  try {
    await db.connect();
    app.listen(PORT, () => console.log(`🌐 Server is running on port ${PORT}`));
  } catch (error) {
    console.log("❌ Could not start server", error);
  }
};

// Call the startServer function: npm run dev
startServer();
