const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri , {
      connectTimeoutMS:30000,
      socketTimeoutMS:30000
    });
    console.log("connected to mongodb database successfully ✅ ");
  } catch (error) {
    console.error("Error connecting to mongodb ❌: " , error.message);
    throw error;
  }
}

module.exports = connectDB;