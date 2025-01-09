const { Stream } = require("../models");

const { validateObjId } = require("../utils/validation");

async function stream(req, res, next) {
  const { id } = req.params;
  const notValidId = validateObjId(id);
  if (notValidId) return res.status(400).json("Invalid Id.");
  const stream = await Stream.findById(id).populate("owner");
  if (!stream) return res.status(404).send("Not found.");

  req.stream = stream;
  next();
}

module.exports = stream;
