const auth = require("../shared/middleware/auth");
const validateStream = require("../shared/middleware/validateStream");
const stream = require("../shared/middleware/stream");
const createRoutes = require("../shared/utils/createRoutes");
const getStream = require("../shared/controllers/getStream");
const {
  storeStream,
  updateStream,
  startStream,
  deleteStream,
} = require("./controller");
const owner = require("../shared/middleware/owner");

const routes = createRoutes((router) => {
  router.get("/:id", stream, getStream);

  router.post("/", auth, validateStream, storeStream);

  router.put("/:id", auth, stream, owner, validateStream, updateStream);
  router.put("/:id/start", auth, stream, owner, startStream);

  router.delete("/:id", auth, stream, owner, deleteStream);
});
module.exports = routes;
