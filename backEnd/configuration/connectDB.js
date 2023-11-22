const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const app = require("./../app");

//const { config } = require('process');

dotenv.config({ path: "./config.env" });

// console.log(process.env.DATABASE);

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const connectToDB = async () => {
  const conn = await mongoose.connect(db, {
    useNewUrlParser: true,
  });

  console.log(`DB connected successfully to ${conn.connection.host}`);
};

module.exports = connectToDB;
