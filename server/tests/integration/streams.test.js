const request = require("supertest");
const { Stream } = require("../../models/stream");
const { default: mongoose } = require("mongoose");
const { mockLogin } = require("../../models/user");
let rtmp;
let proxyServer;
let server;
const jwt = require("jsonwebtoken");
describe("streams", () => {
  beforeEach(async () => {
    rtmp = require("../../startup/rtmpserver");
    proxyServer = require("../../startup/proxy");
    server = require("../../index");
    await Stream.remove({});
  });
  afterEach(async () => {
    server.close();
    proxyServer.close();
    rtmp.stop();
  });
  afterAll(async () => {
    mongoose.disconnect();
    rtmp.stop();
  });
  describe("GET /", () => {
    it("should return all streams", async () => {
      await Stream.collection.insertMany([
        { name: "stream 1" },
        { name: "stream 2" },
      ]);
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body.some((s) => s.name === "stream 1")).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    it("should return a given stream", async () => {
      const stream = await Stream.collection.insertOne({
        name: "reda ahmed khara",
      });

      const response = await request(server).get("/" + stream.insertedId);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty;
    });
    it("should return 400 when sending invalid id", async () => {
      const response = await request(server).get("/1");
      expect(response.status).toBe(400);
      expect(response.body).toContain("Invalid");
    });
    it("should return 404 when sending valid id that not exists", async () => {
      const response = await request(server).get(
        "/" + new mongoose.Types.ObjectId()
      );
      expect(response.status).toBe(404);
    });
  });
  describe("POST /:id", () => {
    it("should return 401 if not authorized", async () => {
      const response = await request(server).post("/");
      expect(response.status).toBe(401);
    });
    it("should return 401 if invalid token", async () => {
      const response = await request(server)
        .post("/")
        .set("x-auth-token", null);
      expect(response.status).toBe(401);
    });
    it("should return 400 if invalid input is sent", async () => {
      const token = mockLogin();
      const response = await request(server)
        .post("/")
        .set("x-auth-token", token);
      expect(response.status).toBe(400);
    });
    it("should create a new stream", async () => {
      const token = await mockLogin();
      const stream = {
        name: new Array(16).join(0),
        description: new Array(21).join(0),
      };
      const response = await request(server)
        .post("/")
        .set("x-auth-token", token)
        .send(stream);
      expect(response.status).toBe(201);
      const newStream = await Stream.findOne({ name: stream.name });
      expect(newStream).not.toBeNull();
      expect(response.body).toHaveProperty("_id");
      expect(newStream).toHaveProperty("description", stream.description);
    });
  });
  describe("PUT /:id", () => {
    it("should return 403 if not the owner of the stream", async () => {
      const token = mockLogin();
      const stream = new Stream({
        name: new Array(16).join(0),
        description: new Array(21).join(0),
        owner: new mongoose.Types.ObjectId(),
      });
      await stream.save();
      const response = await request(server)
        .put("/" + stream._id)
        .set("x-auth-token", token);
      expect(response.status).toBe(403);
    });
    it("should update a stream", async () => {
      const token = await mockLogin();
      const decoded = jwt.decode(token, process.env.JWT_PRIVATE);
      const stream = {
        name: new Array(16).join(0),
        description: new Array(21).join(0),
        owner: decoded._id,
      };
      const existedStream = new Stream(stream);
      await existedStream.save();
      let newName = new Array(16).join(0) + "reda";
      const response = await request(server)
        .put("/" + existedStream._id)
        .set("x-auth-token", token)
        .send({ ...stream, name: newName });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", newName);
      const foundStream = await Stream.findById(existedStream._id);
      expect(foundStream).toHaveProperty("name", newName);
    });
  });
  describe("PUT /:id/start", () => {
    it("should start stream", async () => {
      const token = await mockLogin();
      const decoded = jwt.decode(token, process.env.JWT_PRIVATE);
      const stream = {
        name: new Array(16).join(0),
        description: new Array(21).join(0),
        owner: decoded._id,
      };
      const existedStream = new Stream(stream);
      await existedStream.save();
      const response = await request(server)
        .put(`/${existedStream._id}/start`)
        .set("x-auth-token", token);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("started", true);
      const foundStream = await Stream.findById(existedStream._id);
      expect(foundStream).toHaveProperty("started", true);
    });
  });
  describe("DELETE /:id", () => {
    it("should delete a stream", async () => {
      const token = await mockLogin();
      const decoded = jwt.decode(token, process.env.JWT_PRIVATE);
      const stream = {
        name: new Array(16).join(0),
        description: new Array(21).join(0),
        owner: decoded._id,
      };
      const existedStream = new Stream(stream);
      await existedStream.save();
      const response = await request(server)
        .delete("/" + existedStream._id)
        .set("x-auth-token", token);
      expect(response.status).toBe(200);
    });
  });
});
