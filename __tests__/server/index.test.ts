import request from "supertest";
import app from "../../src/server/app";

jest.mock("../../src/server/app-data-source", () => ({
  picShareDB: {
    initialize: jest.fn(async () => {
      Promise.resolve(true);
    }),
  },
}));

describe("GET /*", () => {
  test("returns the index.html file", async () => {
    const res = await request(app).get("/test/route");
    expect(res.status).toBe(200);
    expect(res.type).toBe("text/html");
  });
});
