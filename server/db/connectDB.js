const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongodb database successfully");
  } catch (error) {
    console.error("Error connecting to mongodb : " , error);
  }
}

module.exports = connectDB;