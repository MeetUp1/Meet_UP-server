require("dotenv").config();

const express = require("express");
const app = express();
const connectMongoDB = require("./utils/mongoose");

app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const test = require("../src/routes/index");

connectMongoDB();

app.use("/test", test);

app.use(function (req, res, next) {
  const err = new Error("404 Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res
    .status(err.status || 500)
    .send({ message: err.message || "500 Internal Server Error" });
});

module.exports = app;
