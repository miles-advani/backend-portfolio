// db.ts

// ❌ ✅ 🔎 🌐 🔄 🔌❗❕👻❔❓🛎️🔔💻📠 📞📩📨✉️📬

// Imports ==============================================

import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

// =============================================================================================
// =============================================================================================
// =============================================================================================
// Static Database URI => Uncomment this block and comment the next block to use this approach

// const mongoDbUri = process.env.MONGODB_URI;

// if (!mongoDbUri) {
//   console.error("❌ MONGODB_URI environment variable is not defined");
//   process.exit(1);
// }

// const connect = async () => {
//   try {
//     await mongoose.connect(mongoDbUri);
//     console.log("✅ Successfully connected to MongoDB");
//   } catch (error) {
//     console.error("❌ Error connecting to MongoDB:", error);
//     process.exit(1); // Exit or implement a reconnection strategy
//   }
// };

// const close = async () => {
//   try {
//     await mongoose.connection.close();
//     console.log("✅ Successfully disconnected from MongoDB");
//   } catch (error) {
//     console.error("❌ Error disconnecting from MongoDB:", error);
//     // Handle the error appropriately
//     // Don't necessarily need to exit the process here
//   }
// };

// =============================================================================================
// =============================================================================================
// =============================================================================================
// Dynamic Database URI => Uncomment this block and comment the previous block to use this approach

// Determine URI function =======================================

// Function to dynamically determine the database URI
// Modify the getDatabaseUri function to use an environment variable for the default database name

const getDatabaseUri = (req = { headers: {} }) => {
  // console.log("🔎 Request headers:", req.headers); // Debugging: Log incoming headers
  const dbName = req.headers["x-database-name"];
  // console.log("🔎 x-database-name:", dbName); // Debugging: Log extracted dbName
  let baseUri = process.env.MONGODB_URI; // Default base URI
  // console.log("🔎 Base URI:", baseUri); // Debugging: Log base URI
  // Use an environment variable for the default database name, fallback to "test" if not defined
  const defaultDbName = process.env.DEFAULT_DB_NAME || "test";
  if (dbName) {
    const finalUri = `${baseUri}${dbName}`;
    // console.log("🔎 Final URI with dbName:", finalUri); // Debugging: Log final URI
    return { uri: finalUri, dbName };
  }
  const defaultUri = `${baseUri}${defaultDbName}`; // Use the environment variable for the default dbName
  // console.log("🔎 Default URI:", defaultUri); // Debugging: Log default URI
  return { uri: defaultUri, dbName: defaultDbName };
};

// Connect function =======================================

// Outside the connect function, declare a variable to store the current database name
let currentDbName = "";

const connect = async (req = { headers: {} }) => {
  const { uri: mongoDbUri, dbName } = getDatabaseUri(req);
  if (!mongoDbUri) {
    console.error("❌ Database URI is not defined");
    return;
  }

  // First condition: Check if there is no running connection and start a new connection
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(mongoDbUri);
      console.log(`🌐 Successfully connected to MongoDB database: ${dbName}`);
      currentDbName = dbName; // Update the current database name
      return; // Exit after establishing a new connection
    } catch (error) {
      console.error("❌ Error connecting to MongoDB:", error);
    }
  }

  // Second condition: Check if the requested database is the same as the current one
  if (dbName === currentDbName) {
    console.log(
      `🔄 Reusing existing connection to MongoDB database: ${dbName}`
    );
    return; // Return early as there's no need to reconnect
  }

  // Third condition: If the requested database is different from the current one
  // Close the existing connection and establish a new one
  try {
    await mongoose.connection.close();
    console.log(
      `🔌 Closing existing connection to database: ${currentDbName} before connecting to a new database`
    );
    await mongoose.connect(mongoDbUri);
    console.log(`🌐 Successfully connected to MongoDB database: ${dbName}`);
    currentDbName = dbName; // Update the current database name
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};

// Close function =======================================

const close = async () => {
  try {
    await mongoose.connection.close();
    console.log("✅ Successfully disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error disconnecting from MongoDB:", error);
    // Handle the error appropriately
    // Don't necessarily need to exit the process here
  }
};

// =============================================================================================
// =============================================================================================
// =============================================================================================

// Exports =============================================

export default { connect, close };
