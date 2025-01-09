// const express = require("express");
// const httpProxy = require("http-proxy");
// const fs = require("fs");
// const { STREAM_STATUS } = require("../models/stream");
// const proxyServer = express();
// const proxy = httpProxy.createProxyServer();
// const cors = require("cors");
// const stream = require("../../../server/middleware/stream");

// proxyServer.use(cors());

// // get live stream
// proxyServer.get("/live/:id", stream, async (req, res) => {
//   const streamKey = req.stream.key;
//   if (req.stream.status !== STREAM_STATUS.STREAMING)
//     return res.status(400).send("Requested stream not streaming now.");
//   req.url = `/live/${streamKey}.flv`;
//   proxy.web(req, res, { target: "http://localhost:8000" });
// });

// // get recorderd streams
// proxyServer.get("/recorded/:id", stream, async (req, res) => {
//   if (req.stream.status !== STREAM_STATUS.STOPPED) {
//     return res.status(400).send("Requested stream not recorded yet.");
//   }
//   // stream recoreded
//   const streamKey = req.stream.key;
//   const streamDirPath = `media/live/${streamKey}`;
//   try {
//     fs.readdir(streamDirPath, (err, files) => {
//       if (err) {
//         console.log(err);
//         return res.status(400).send("Stream files not found.");
//       }
//       if (files.length < 1)
//         return res.status(400).send("Stream files not found.");
//       const firstFilePath = streamDirPath + "/" + files[0];
//       const readStream = fs.createReadStream(firstFilePath);
//       return readStream.pipe(res);
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(404).send("Stream files not found.");
//   }
// });

// module.exports = proxyServer.listen(5000, () => {
//   console.log("Proxy server running on port 5000");
// });
