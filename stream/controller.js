const path = require("path");
const fs = require("fs");
const { STREAM_STATUS } = require("../shared/models/stream");
const getVideo = async (req, res) => {
  if (req.stream.status !== STREAM_STATUS.STOPPED) {
    return res.status(400).send("Requested stream not recorded yet.");
  }
  // stream recoreded
  const streamKey = req.stream.key;

  const streamDirPath = path.join("../", "storage", "media", "live", streamKey);
  try {
    fs.readdir(streamDirPath, (err, files) => {
      if (err) {
        console.log(err);
        return res.status(400).send("Stream files not found.");
      }
      if (files.length < 1)
        return res.status(400).send("Stream files not found.");
      const firstFilePath = streamDirPath + "/" + files[0];
      const readStream = fs.createReadStream(firstFilePath);
      return readStream.pipe(res);
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send("Stream files not found.");
  }
};

module.exports = {
  getVideo,
};
