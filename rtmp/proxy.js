const httpProxy = require("http-proxy");
const { STREAM_STATUS } = require("../shared/models/stream");
const proxy = httpProxy.createProxyServer();
const stream = require("../shared/middleware/stream");
const startServer = require("../shared/startServer");

startServer("Live Streaming Server", 5000, (router) => {
  router.get("/:id", stream, async (req, res) => {
    const streamKey = req.stream.key;
    if (req.stream.status !== STREAM_STATUS.STREAMING)
      return res.status(400).send("Requested stream not streaming now.");
    req.url = `/live/${streamKey}.flv`;
    proxy.web(req, res, { target: "http://localhost:8000" });
  });
});
