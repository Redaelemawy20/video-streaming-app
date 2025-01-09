const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const streams = require("./routes/streams");
const file = require("./routes/file");

// middelwares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// routes
app.use("/", streams);

app.use("/file", file);
require("../shared/startup/dbConnect")(); // database connection
// require("./startup/proxy"); // proxy server

module.exports = app.listen(3001, () => {
  console.log("listen on port 3000");
});
