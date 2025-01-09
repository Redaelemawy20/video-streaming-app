const startServer = require("../shared/startServer");
const routes = require("./routes");

const PORT = 8002;

startServer("Query Service", PORT, (app) => {
  app.use("/", routes);
});
