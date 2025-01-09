const { login } = require("../controllers/authController");
const createRoutes = require("../../shared/utils/createRoutes");

const routes = createRoutes((router) => {
  router.get("/", (req, res) => res.send("hello"));
  router.post("/", login);
});
module.exports = routes;
