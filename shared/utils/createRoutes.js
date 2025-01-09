const express = require("express");

const createRoutes = (cb) => {
  const router = express.Router();
  cb(router);
  return router;
};

module.exports = createRoutes;
