jest.mock("../src/routes/index.js", () => ({
  __esModule: true,
  default: require("express").Router(),
}));

import app from "../src/app.js";
import supertest from "supertest";

const request = supertest(app);

describe("sample test endpoint", () => {
  test("should return response on ping", async () => {
    const response = await request.get("/ping");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Ping OK" });
  });
});