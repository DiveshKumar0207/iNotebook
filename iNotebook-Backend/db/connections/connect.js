const mongoose = require("mongoose");
require("dotenv").config({path: "../iNotebook-Backend/.env"});

const URL = "mongodb://127.0.0.1:27017/iNotebook";

mongoose
  .connect(URL)
  .then(() => {
    console.log("successful connection to database ");
  })
  .catch((error) => {
    console.log(`connection to database failed. \n error occured : ${error}`);
  });
