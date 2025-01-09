const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { User } = require("../../shared/models/user");
const keys = require("../keys");

const InsertIfNotExist = async (payload) => {
  const user = await User.findOneAndUpdate(
    { email: payload.email },
    _.pick(payload, ["name", "picture", "sub"]),
    {
      upsert: true,
      new: true,
    }
  );
  return user;
};

const generateAcesssToken = (user) => {
  const token = jwt.sign(
    _.pick(user, ["name", "picture", "email", "_id", "sub"]),
    keys.JWT_PRIVATE,
    { expiresIn: 60 * 60 }
  );
  return token;
};

module.exports = {
  InsertIfNotExist,
  generateAcesssToken,
};
