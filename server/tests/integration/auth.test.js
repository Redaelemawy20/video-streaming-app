const request = require("supertest");
const { default: mongoose } = require("mongoose");
let server;
let rtmp;
let proxyServer;
describe("auth middelware", () => {
  beforeAll(() => {
    rtmp = require("../../startup/rtmpserver");
  });
  beforeEach(async () => {
    proxyServer = require("../../startup/proxy");
    // server = require("../../index");
    // await Stream.remove({});
  });
  afterEach(async () => {
    await rtmp.stop();
    // server.close();
    proxyServer.close();
  });
  afterAll(async () => {
    await rtmp.stop();
    mongoose.disconnect();
  });
  // it("should return 401 if no token provided", async () => {
  //   const response = await request(server).post("/");
  //   expect(response.status).toBe(401);
  // });
  it("should return 401 if invalid token", async () => {
    // const response = await request(server).post("/").set("x-auth-token", "ss");
    // expect(response.status).toBe(401);
  });
});
