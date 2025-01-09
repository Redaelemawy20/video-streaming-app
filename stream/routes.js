const createRoutes = require("../shared/utils/createRoutes");
const { getVideo } = require("./controller");
const stream = require("../shared/middleware/stream");
const getStream = require("../shared/controllers/getStream");

const routes = createRoutes((router) => {
  router.get("/:id", stream, getStream);
  router.get("/v/:id", stream, getVideo);
});
module.exports = routes;
