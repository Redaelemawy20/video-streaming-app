const {
  Stream,
  generateStreamKey,
  STREAM_ALLOWED_PROPS,
  STREAM_STATUS,
} = require("../../shared/models/stream");
const _ = require("lodash");

const streamBodyToSave = (body) => {
  return _.pick(body, ["name", "description"]);
};

const mystreams = async (req, res) => {
  const streams = await Stream.find({ owner: req.user._id }).select("-key");
  res.send(streams);
};
const getStream = async (req, res) => {
  res.send(_.pick(req.stream, STREAM_ALLOWED_PROPS));
};

const storeStream = async (req, res) => {
  const body = streamBodyToSave(req.body);
  const stream = new Stream({
    owner: req.user._id,
    ...body,
  });
  await stream.save();

  res.status(201).send(stream);
};

const updateStream = async (req, res) => {
  const body = streamBodyToSave(req.body);
  req.stream.set(body);
  await req.stream.save();
  res.status(200).send(_.pick(req.stream, STREAM_ALLOWED_PROPS));
};
const startStream = async (req, res) => {
  const { stream } = req;
  const streamKey = generateStreamKey(stream.name);
  stream.status = STREAM_STATUS.STARTED;
  stream.key = streamKey;
  await stream.save();
  res.send(_.pick(stream, [...STREAM_ALLOWED_PROPS, "key"]));
};
const deleteStream = async (req, res) => {
  await req.stream.delete();
  res.status(200).send("stream deleted");
};

module.exports = {
  getStream,
  storeStream,
  updateStream,
  deleteStream,
  startStream,
  mystreams,
};
