const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");
const data = require("../db/data/test-data");
const db = require("../db/connection.js");

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api/topics", () => {
  test("200, respond with array of objects with property of slug & description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const topicsArray = body.topics;

        expect(topicsArray).toHaveLength(3);

        topicsArray.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("404: end point not found", () => {
  test("404: respond with message of endpoint doesn't exist", () => {
    return request(app)
      .get("/api/doesnt-exist")
      .expect(404)
      .then(({ body }) => {
        expect(body).toHaveProperty("message");
        expect(body.message).toBe("endpoint doesn't exist");
      });
  });
});

describe("GET /api/users", () => {
  test("200, respond with array of objects with property of username, name and avatar_url", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const usersArray = body.users;

        console.log(usersArray, "Inside of tests for user");

        expect(usersArray).toHaveLength(4);

        usersArray.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});
