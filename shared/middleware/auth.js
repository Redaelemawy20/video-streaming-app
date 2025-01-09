const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const user = jwt.verify(token, "Mysecret");
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Invalid token.");
  }
}

module.exports = auth;
