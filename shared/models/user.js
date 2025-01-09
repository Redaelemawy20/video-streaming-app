const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      maxlength: 250,
    },
  })
);
const schema = {
  name: Joi.string().required().min(5).max(50),
  email: Joi.string().required().min(5).max(50).email(),
};

module.exports = {
  User,
  userSchema: schema
};


