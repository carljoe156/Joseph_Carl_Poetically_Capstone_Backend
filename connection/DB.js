const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectionWithDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URI;

    if (!mongoURL) {
      throw new Error("We're sorry, Try Again!");
    }

    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Database connection error:", err.message || err);
    process.exit(1); // If bad connection, will exit immediately
  }
};

module.exports = connectionWithDB;
