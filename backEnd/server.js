const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');

const app = require("./app");
const connectDB = require('./configuration/connectDB');


dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});


connectDB();


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port} in '${process.env.NODE_ENV}' mode`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

app.get("/", (req, res) => {
  res.send("Radhe Radhe!");
});
