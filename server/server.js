const express = require("express");
const cors = require("cors");
require("dotenv").config();
const logger = require("./middlewares/logger");
const connectDB = require("./db/connectDB");
const directoryRouter = require("./routes/directory.routes");

const app = express();

app.use(cors(), logger, express.json(), express.urlencoded({ extended: true }));

app.use("/directories", directoryRouter);

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

const start = async () => {
  try {
    await connectDB(uri);
    app.listen(port, () => {
      console.log("server running successfully");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
