const express = require("express");

const auth = require("../middleware/auth");
const owner = require("../middleware/owner");
const stream = require("../middleware/stream");
const validateStream = require("../middleware/validateStream");
const StreamController = require("../controllers/streamController");
const router = express.Router();

router.get("/", StreamController.getStreams);
router.get("/mystreams", auth, StreamController.mystreams);
router.get("/:id", stream, StreamController.getStream);

router.post("/", auth, validateStream, StreamController.storeStream);

router.put(
  "/:id",
  auth,
  stream,
  owner,
  validateStream,
  StreamController.updateStream
);
router.put("/:id/start", auth, stream, owner, StreamController.startStream);

router.delete("/:id", auth, stream, owner, StreamController.deleteStream);

module.exports = router;
