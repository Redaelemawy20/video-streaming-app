const mongoose = require("mongoose");

const connect = () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`connected to mongodb ${process.env.MONGO_URL}...`);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connect;
