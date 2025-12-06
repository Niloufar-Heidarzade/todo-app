const express = require("express");
const cors = require("cors");
require("dotenv").config();
const logger = require("./middlewares/logger")

const app = express();

app.use(cors() , logger , express.json() , express.urlencoded({extended : true}));

app.get("/" , (req , res) => {
  res.send("Hi there!");
});

const port = process.env.PORT;

app.listen(port , () => {
  console.log("server running successfully");
});

