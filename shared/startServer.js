const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./startup/dbConnect");
const morgan = require("morgan");

function startServer(serviceName, port, routes, onListen) {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan("tiny"));
  routes(app);
  connectDB(() => {
    app.listen(port, () => {
      if (typeof onListen === "function") onListen();
      else console.log(`${serviceName} is running on port ${port}.`);
    });
  });
}

module.exports = startServer;
