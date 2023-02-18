const { validate } = require("../models/stream");

function validateStream(req, res, next) {
  const validationError = validate(req.body);
  if (validationError) return res.status(400).send(validationError);
  next();
}

module.exports = validateStream;
