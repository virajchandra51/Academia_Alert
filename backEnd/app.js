const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//ROUTERS
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const announcementRouter = require("./routes/announcementRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//express.json(), it's specifically about converting the incoming JSON-formatted data into a JavaScript object.
//So, when you use app.use(express.json()), you are telling your Express application to automatically handle the process of extracting the JSON data from incoming requests, parse it into a JavaScript object, and make that object available in the req.body property. This req.body object can then be used in your route handlers or middleware to access and manipulate the data sent by the client.
const cors = require("cors");
app.use(cors());
app.use(express.json());

//Will parse the URL Encoded data into the req.body object
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/announcements", announcementRouter);

module.exports = app;
