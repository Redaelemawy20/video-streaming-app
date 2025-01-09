const startServer = require("../shared/startServer");
const routes = require("./routes");

const PORT = 8004;

startServer("Moderation Service", PORT, (app) => {
  app.use("/", routes);
});
