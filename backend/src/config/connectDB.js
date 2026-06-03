const mongoose = require("mongoose");
const database = require("./database");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(database.uri);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
