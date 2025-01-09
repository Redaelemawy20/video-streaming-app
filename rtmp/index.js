const NodeMediaServer = require("node-media-server");
const event = require("./event");
const streamingServerConfig = require("./config");
const { Stream, STREAM_STATUS } = require("../shared/models/stream");
const takeSnapshot = require("./helpers/takeSnapshot");
const streamingServer = new NodeMediaServer(streamingServerConfig);
require("./proxy");
streamingServer.run();

//fires once a new client connected to the streaming server
streamingServer.on("preConnect", (id, args) => {
  console.log("preconnect");
});

// fires once streaming application such as OBS requests intial connection to the server
// here we can validate the stream key
streamingServer.on("prePublish", async (id, StreamPath, args) => {
  const key = extractStreamKey(StreamPath);
  const stream = await Stream.findOne({
    key,
  });
  if (!stream || stream.status !== STREAM_STATUS.STARTED) {
    let session = streamingServer.getSession(id);
    session.reject();
  } else {
    console.log("prePublish", StreamPath);
    stream.status = STREAM_STATUS.STREAMING;
    await stream.save({ validateBeforeSave: false });
  }
});
event.on("started", async (stream) => {
  console.log("event emmited");
  const imagePath = await takeSnapshot(stream);
  stream.image = imagePath;
  console.log("scrren taked");
  await stream.save();
});
// fires once the connection is established between the server and OBS.
streamingServer.on("postPublish", async (id, StreamPath, args) => {
  const key = extractStreamKey(StreamPath);
  const stream = await Stream.findOne({ key });
  if (!stream.image) {
    event.emit("started", stream);
    // const imagePath = await takeSnapshot(stream);
    // stream.image = imagePath;
    // await stream.save();
  }
});

// fires once the stream owner decides to end the stream.
streamingServer.on("donePublish", async function (id, StreamPath, args) {
  const key = extractStreamKey(StreamPath);
  const stream = await Stream.findOne({ key });
  stream.status = STREAM_STATUS.STOPPED;
  await stream.save();
});

const extractStreamKey = (streamPath) => {
  let paths = streamPath.split("/");
  return paths[paths.length - 1];
};
