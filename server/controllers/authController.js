const gooleClient = require("../config/googleClient");
const { loginUser } = require("../models/user");
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const login = async (req, res) => {
  const ticket = await gooleClient.verifyIdToken({
    idToken: req.body.credential,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const token = await loginUser(payload);
  return res
    .set({
      "Access-Control-Expose-Headers": "x-auth-token",
      "x-auth-token": token,
    })
    .status(201)
    .send("Sucess.");
};

module.exports.login = login;
