const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

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

const loginUser = async function (payload) {
  const user = await User.findOneAndUpdate(
    { email: payload.email },
    _.pick(payload, ["name", "picture", "sub"]),
    {
      upsert: true,
      new: true,
    }
  );
  return generateAcesssToken(user);
};
const mockLogin = () => {
  return generateAcesssToken({
    _id: new mongoose.Types.ObjectId(),
    name: "reda elemawy",
    email: "reda@gmail.com",
    picture: "pic.png",
  });
};
const generateAcesssToken = (user) => {
  const token = jwt.sign(
    _.pick(user, ["name", "picture", "email", "_id", "sub"]),
    process.env.JWT_PRIVATE,
    { expiresIn: 60 * 60 }
  );
  return token;
};
exports.loginUser = loginUser;
exports.mockLogin = mockLogin;
exports.generateAcesssToken = generateAcesssToken;
exports.User = User;
exports.userSchema = schema;
