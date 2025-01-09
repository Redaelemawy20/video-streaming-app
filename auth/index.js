const startServer = require("../shared/startServer");
const routes = require("./routes");

const PORT = 8000;

startServer("Auth Service", PORT, (app) => {
  app.use("/", routes);
});
