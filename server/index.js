const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config({
  path: path.resolve(process.cwd(), `.env.` + app.get("env")),
});
const bodyParser = require("body-parser");
const cors = require("cors");
const streams = require("./routes/streams");
const auth = require("./routes/auth");
const file = require("./routes/file");

// middelwares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// routes
app.use("/", streams);
app.use("/auth", auth);
app.use("/file", file);
require("./startup/dbConnect")(); // database connection
require("./startup/proxy"); // proxy server
require("./startup/rtmpserver"); // rtmp server

module.exports = app.listen(3001, () => {});
