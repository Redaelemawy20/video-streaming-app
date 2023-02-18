const express = require("express");
const fileController = require("../controllers/fileController");
const router = express.Router();

router.get("/:filename", fileController.getFile);

module.exports = router;
