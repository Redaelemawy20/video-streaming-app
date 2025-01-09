const mongoose = require("mongoose");
const { MONGO_URL } = require("../keys");

const connect = (cb) => {
  return mongoose
    .connect(MONGO_URL)
    .then(() => {
      if (typeof cb === "function") {
        cb();
      }
      console.log("abu shaymaa bimassy");
      console.log(`connected to mongodb ${MONGO_URL}...`);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connect;
