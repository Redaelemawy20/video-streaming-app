const {STREAM_ALLOWED_PROPS} = require("../models/stream")
const _pick = require("../utils/_pick");
const getStream = async (req, res) => {
    res.send(_pick(req.stream, STREAM_ALLOWED_PROPS));
  };
module.exports = getStream;