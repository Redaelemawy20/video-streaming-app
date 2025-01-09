const startServer = require("../shared/startServer");
const routes = require("./routes");

const PORT = 8006;

startServer("Streaming Service", PORT, (app) => {
  app.use("/", routes);
});
