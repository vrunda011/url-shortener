const mongoose = require("mongoose");

let MONGODB_URL = "mongodb://127.0.0.1:27017/url-shortener";

// Connect to MongoDB using Mongose
const connectDB = async () => {
  await mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
      console.log(`Failed to connect to MongoDB: ${err}`);
    });
};

module.exports = { connectDB };
