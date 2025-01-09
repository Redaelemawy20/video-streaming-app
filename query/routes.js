const createRoutes = require("../shared/utils/createRoutes");
const { getStreams, mystreams } = require("./controller");
const { getFile } = require("./fileController");
const auth = require("../shared/middleware/auth");

const routes = createRoutes((router) => {
  router.get("/", getStreams);
  router.get("/mystreams", auth, mystreams);
  router.get("/:filename", getFile);
});
module.exports = routes;
