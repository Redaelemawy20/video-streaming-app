const connect = require("../../startup/dbConnect");
describe("database connection", () => {
  it("should trimnate the process if invalid connection uri", async () => {
    const mockExit = jest
      .spyOn(process, "exit")
      .mockImplementation((number) => {
        throw new Error("process.exit: " + number);
      });
    try {
      await connect();
    } catch (error) {
      expect(mockExit).toHaveBeenCalledWith(1);
    }
    mockExit.mockRestore();
  });
});
