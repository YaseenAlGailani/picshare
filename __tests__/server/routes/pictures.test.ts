import request from "supertest";
import app from "../../../src/server/app";
import { Picture } from "../../../src/server/entities/picture.entity";
import { picShareDB } from "../../../src/server/app-data-source";

describe("GET /", () => {
  test("Returns a list of pictures and pagination info", async () => {
    Picture.findAndCount = jest.fn().mockResolvedValueOnce([
      [
        { id: 1, url: "example.com/image1.jpg" },
        { id: 2, url: "example.com/image2.jpg" },
      ],
      2,
    ]);
    const response = await request(app).get("/api/pictures");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      pictures: [
        { id: 1, url: "example.com/image1.jpg" },
        { id: 2, url: "example.com/image2.jpg" },
      ],
      pageInfo: { hasNext: false, lastId: 2 },
    });
    expect(Picture.findAndCount).toHaveBeenCalledWith({
      take: 12,
      order: { id: "desc" },
    });
  });

  test("Returns an empty pictures array when there are no pictures stored", async () => {
    Picture.findAndCount = jest.fn().mockResolvedValueOnce([[], 0]);
    const response = await request(app).get("/api/pictures");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      pictures: [],
      pageInfo: {},
    });
  });

  test("Returns a 500 error when there is a server error ", async () => {
    console.error = jest.fn();
    Picture.findAndCount = jest
      .fn()
      .mockRejectedValueOnce(new Error("Database error"));
    const response = await request(app).get("/api/pictures");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Server error");
  });
});

describe("GET /:id", () => {
  
  beforeAll(async () => {
    await picShareDB.initialize();
  });

  afterAll(async () => {
    await picShareDB.destroy();
  });

  test("Returns a picture with a given id", async () => {
    const picture = new Picture();
    picture.title = "Test";
    picture.date = new Date();
    picture.username = "Test";
    picture.url = "example.com/image1.jpg";
    const { id } = await picture.save();
    const response = await request(app).get(`/api/pictures/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id,
      title: picture.title,
      date: picture.date.toISOString(),
      username: picture.username,
      url: picture.url,
    });
    await picture.remove();
  });

  test("Returns 404 when a picture with given id is not found", async () => {
    const response = await request(app).get("/api/pictures/0");
    expect(response.status).toBe(404);
  });
});
