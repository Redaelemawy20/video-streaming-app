const gooleClient = require("../config/googleClient");

const keys = require("../keys");
const { generateAcesssToken, InsertIfNotExist } = require("../services/login");

const login = async (req, res) => {
  const ticket = await gooleClient.verifyIdToken({
    idToken: req.body.credential,
    audience: keys.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const user = await InsertIfNotExist(payload);
  const token = generateAcesssToken(user);
  return res
    .set({
      "Access-Control-Expose-Headers": "x-auth-token",
      "x-auth-token": token,
    })
    .status(201)
    .send("Sucess.");
};

module.exports = {
  login,
};
