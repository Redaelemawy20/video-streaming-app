const fs = require("fs");
const getFile = async (req, res) => {
  const filePath = `./screenshots/${req.params.filename}`;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(404).send("File not found");
    }
    res.set("Content-Type", "image/jpeg");
    res.send(data);
  });
};

module.exports = {
  getFile,
};
