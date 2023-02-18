const auth = require("../../middleware/auth");
const { mockLogin } = require("../../models/user");
const path = require("path");
require("dotenv").config({
  path: path.resolve(process.cwd(), `.env.test`),
});
describe("auth middleware", () => {
  it("should call next function ", () => {
    const token = mockLogin();
    const request = {
      header: jest.fn().mockReturnValue(token),
    };
    const next = jest.fn();
    auth(request, null, next);
    expect(request.user).toHaveProperty("name", "reda elemawy");
    expect(request.user).toHaveProperty("email", "reda@gmail.com");
    expect(next).toHaveBeenCalled();
  });
});
