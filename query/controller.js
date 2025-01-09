const { Stream } = require("../shared/models");
const { STREAM_STATUS } = require("../shared/models/stream");
const getStreams = async (req, res) => {
  console.log("getting list of streams");
  const { status } = req.query;
  let streams = [];
  if (status) {
    console.log("#");
    streams = await Stream.find({ status }).limit(3).populate("owner");
    if (status === STREAM_STATUS.STREAMING) {
      //   await streamPic(streams);
    }
  } else {
    console.log("*");
    streams = await Stream.find().select("-key");
  }
  res.send(streams);
};
const mystreams = async (req, res) => {
  const streams = await Stream.find({ owner: req.user._id }).select("-key");
  res.send(streams);
};
// const streamPic = async (streams) => {
//     for (let stream of streams) {
//       try {
//         const snapShot = await takeStreamSnapShot(stream);
//         stream.image = snapShot;
//         await stream.save();
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
module.exports = {
  getStreams,
  mystreams,
};
