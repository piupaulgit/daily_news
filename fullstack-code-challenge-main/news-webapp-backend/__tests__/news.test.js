const request = require("supertest");
const app = require("../index");
describe("top headlines endpoint", function () {
  it("/news/top-headlines returns 200 status", async () => {
    const res = await request(app)
      .get(`/news/top-headlines?country=gb&apiKey=${process.env.NEWSAPI_URL}`)
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(200);
  });

  it("/news/top-headlines response body with ok status", async () => {
    const res = await request(app)
      .get(`/news/top-headlines?country=gb`)
      .set("Accept", "application/json");
    expect(res.body.status).toEqual("ok");
  });
});

describe("everything endpoint", function () {
  it("/news/everything returns 200 status", async () => {
    const res = await request(app)
      .get(`/news/everything?q=test`)
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(200);
  });

  it("/news/everything response body contains articles", async () => {
    const res = await request(app)
      .get(`/news/everything?q=test`)
      .set("Accept", "application/json");
    expect(res.body.articles).toBeDefined();
    expect(res.body.articles.length).toBeGreaterThan(0);
  });

  it("/news/everything returns 400 for missing query", async () => {
    const res = await request(app)
      .get(`/news/everything`)
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(400);
  });

  it("/news/everything returns 500 if there's an internal server error", async () => {
    const mockAxios = require("axios");
    jest
      .spyOn(mockAxios, "get")
      .mockRejectedValue(new Error("Internal server error"));

    const res = await request(app)
      .get(`/news/everything?q=error`)
      .set("Accept", "application/json");
    expect(res.statusCode).toEqual(500);
  });
});
