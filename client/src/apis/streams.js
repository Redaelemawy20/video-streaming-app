import axios from "axios";
axios.defaults.headers["x-auth-token"] = localStorage.getItem("credentials");
export default axios.create({
  baseURL: "http://localhost:3001",
});
