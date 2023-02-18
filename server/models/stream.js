const Joi = require("joi");
const mongoose = require("mongoose");
const { validateAll } = require("../util/validation");
const crypto = require("crypto");
const STREAM_ALLOWED_PROPS = [
  "_id",
  "name",
  "description",
  "status",
  "owner",
  "streaming",
  "image",
];
const STREAM_STATUS = Object.freeze({
  CREATED: "CREATED",
  STARTED: "STARTED",
  STREAMING: "STREAMING",
  STOPPED: "STOPPED",
});

const Stream = mongoose.model(
  "Stream",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    image: String,
    description: { type: String, minlength: 5, maxlength: 500 },
    key: { type: String },
    status: {
      type: String,
      default: STREAM_STATUS.CREATED,
      enum: STREAM_STATUS,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  })
);

const generateStreamKey = (streamName) => {
  const streamKey =
    crypto.randomBytes(16).toString("hex") +
    "__" +
    streamName.replace(/\s+/g, "_");
  return streamKey;
};
const validate = (data) => {
  const schema = {
    name: Joi.string().required().max(50),
    description: Joi.string().max(500),
  };
  return validateAll(schema, data);
};

exports.validate = validate;
exports.Stream = Stream;
exports.generateStreamKey = generateStreamKey;
exports.STREAM_ALLOWED_PROPS = STREAM_ALLOWED_PROPS;
exports.STREAM_STATUS = STREAM_STATUS;
