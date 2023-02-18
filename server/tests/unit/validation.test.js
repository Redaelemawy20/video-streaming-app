const { userSchema } = require("../../models/user");
const { validateAll } = require("../../util/validation");

describe("Validation", () => {
  it("should return a error if data don't match schema", () => {
    const error = validateAll(userSchema, {});
    expect(error).toBeDefined();
  });
  it("should return null if data matches schema", () => {
    const error = validateAll(userSchema, {
      name: new Array(10).join("r"),
      email: "reda@gmail.com",
    });
    expect(error).toBeNull();
  });
});
