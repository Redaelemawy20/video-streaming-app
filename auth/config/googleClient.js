const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "236980003827-t42q80ai1qti9801fi1lu9b6gut184vp.apps.googleusercontent.com";
const gooleClient = new OAuth2Client(CLIENT_ID);
module.exports = gooleClient;
