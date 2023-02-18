const { default: mongoose } = require("mongoose");
const { login } = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({
  path: path.resolve(process.cwd(), `.env.test`),
});
let userObj = {
  _id: new mongoose.Types.ObjectId(),
  name: "reda elemawy",
  email: "reda@gmail.com",
  picture: "pic.png",
};
jest.mock("../models/user", () => {
  const originalModule = jest.requireActual("../models/user");

  return {
    ...originalModule,
    User: {
      ...originalModule.User,
      findOneAndUpdate: jest.fn().mockResolvedValue({
        name: "reda elemawy",
        email: "reda@gmail.com",
        picture: "pic.png",
      }),
    },
  };
});

jest.mock("google-auth-library", () => {
  const originalModule = jest.requireActual("google-auth-library");

  //Mock the default export and named export 'foo'
  return {
    ...originalModule,
    OAuth2Client: jest.fn(() => ({
      verifyIdToken: jest.fn().mockResolvedValue({
        getPayload: jest.fn().mockReturnValue({
          name: "reda elemawy",
          email: "reda@gmail.com",
          picture: "pic.png",
        }),
      }),
    })),
  };
});
describe("Login", () => {
  it("should login and set header with token", async () => {
    // User.findOneAndUpdate.mockResolvedValue(userObj);
    const res = {};
    let header;
    res.send = jest.fn();
    res.status = jest.fn(() => res);
    res.set = jest.fn((h) => {
      header = h;
      return res;
    });
    await login({ body: { credential: "" } }, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(header).toHaveProperty("x-auth-token");
    const decoded = jwt.decode(header["x-auth-token"]);
    expect(decoded).toHaveProperty("email", "reda@gmail.com");
  });
});
