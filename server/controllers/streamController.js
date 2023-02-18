const {
  Stream,
  generateStreamKey,
  STREAM_ALLOWED_PROPS,
  STREAM_STATUS,
} = require("../models/stream");
const _ = require("lodash");
const takeStreamSnapShot = require("../helpers/takeStreamSnapShot");

const streamBodyToSave = (body) => {
  return _.pick(body, ["name", "description"]);
};
const getStreams = async (req, res) => {
  const { status } = req.query;
  let streams;

  if (status) {
    streams = await Stream.find({ status }).limit(3).populate("owner");
    if (status === STREAM_STATUS.STREAMING) {
      await streamPic(streams);
    }
  } else streams = await Stream.find().select("-key");

  res.send(streams);
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

const streamPic = async (streams) => {
  for (let stream of streams) {
    try {
      const snapShot = await takeStreamSnapShot(stream);
      stream.image = snapShot;
      await stream.save();
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  getStreams,
  getStream,
  storeStream,
  updateStream,
  deleteStream,
  startStream,
  mystreams,
};
