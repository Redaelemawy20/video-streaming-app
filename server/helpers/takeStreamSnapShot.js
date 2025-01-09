const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfprobePath("/usr/local/bin/ffprobe.exe");
ffmpeg.setFfmpegPath("/usr/local/bin/ffmpeg.exe");

async function takeStreamSnapShot(stream) {
  const streamUrl = `http://localhost:8000/live/${stream.key}.flv`;

  return new Promise((resolve, reject) => {
    ffmpeg(streamUrl)
      .on("filenames", function (filenames) {
        // setting file name
        filenames[0] = `${stream.id}.png`;
      })
      .on("error", function (err) {
        reject(err);
      })
      .on("end", function () {
        const screenshotPath = `${stream.id}.png`;
        // all is well
        resolve(screenshotPath);
      })

      .screenshots({
        count: 1,
        folder: "screenshots",
        size: "320x240",
      });
  });
}
module.exports = takeStreamSnapShot;
