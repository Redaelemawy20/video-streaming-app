const ffmpeg = require("fluent-ffmpeg");
const os = require("os");

const getIpAddress = () => {
  const ifaces = os.networkInterfaces();
  let ipAddress;

  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      if (iface.family !== "IPv4" || iface.internal !== false) {
        return;
      }

      if (!ipAddress) {
        ipAddress = iface.address;
      }
    });
  });

  return ipAddress;
};

const ipAddress = getIpAddress();
async function takeSnapshot(stream) {
  const streamUrl = `http://${ipAddress}:8000/live/${stream.key}.flv`;

  try {
    // Use request-promise to send an HTTP GET request to the stream URL

    // Pass the response data to fluent-ffmpeg to take a screenshot
    return new Promise((resolve, reject) => {
      ffmpeg(streamUrl, {})
        .on("filenames", function (filenames) {
          // setting file name
          filenames[0] = `${stream.id}.png`;
        })
        .on("error", function (err) {
          console.log("ERROR");
          reject(err);
        })
        .on("end", function () {
          const screenshotPath = `${stream.id}.png`;
          // all is well
          console.log("NO ERROR");
          resolve(screenshotPath);
        })
        .screenshots({
          count: 1,
          folder: "../../storage/screenshots",
          size: "320x240",
        });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = takeSnapshot;
