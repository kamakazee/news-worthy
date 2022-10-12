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

describe("GET /api/topics/:topic", () => {
  test("200, respond with object with property of slug & description", () => {
    return request(app)
      .get("/api/topics/mitch")
      .expect(200)
      .then(({ body }) => {
        const topic = body.topic;
        expect(topic).toEqual({
          description: "The man, the Mitch, the legend",
          slug: "mitch",
        });
      });
  });
  describe("404: topic doesn't exist", () => {
    test("404: respond with message of Bad Request", () => {
      return request(app)
        .get("/api/topics/random")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "Topic doesn't exist",
          });
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

describe("GET api/articles", () => {
  test("200: respond with array of articles and additional column of comment_count", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articlesArray = body.articles;

        expect(articlesArray).toHaveLength(12);

        articlesArray.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_id: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("200: respond with array of articles filtered by query of topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        const articlesArray = body.articles;

        expect(articlesArray).toHaveLength(11);

        articlesArray.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              topic: "mitch",
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_id: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });

  test("200: respond with empty array when no articles exist for topic", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then(({ body }) => {
        const articlesArray = body.articles;
        expect(articlesArray).toEqual([]);
      });
  });
  describe("404: topic doesn't exist", () => {
    test("404: return message to indicate no data available for topic", () => {
      return request(app)
        .get("/api/articles?topic=random")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "Topic doesn't exist",
          });
        });
    });
  });
});

describe("GET api/articles/:article_id", () => {
  test("200: respond with all articles for endpoint of api/articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articlesArray = body.articles;
        expect(articlesArray).toHaveLength(12);

        articlesArray.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_id: expect.any(Number),
            })
          );
        });
      });
  });

  test("200: respond with article as requested by article id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const article = body.article;

        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          comment_count: `11`,
        });
      });
  });

  test("200: respond with article as requested by article id", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        const article = body.article;

        expect(article).toEqual({
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: "2020-11-03T09:12:00.000Z",
          votes: 0,
          comment_count: "2",
        });
      });
  });

  describe("404: article id id doesn't exist", () => {
    test("404: article id doesn't exist", () => {
      return request(app)
        .get("/api/articles/13")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "article id doesn't exist",
          });
        });
    });
  });

  describe("400: article id is a string instead of a number", () => {
    test("400: Respond with error message that is a bad request", () => {
      return request(app)
        .get("/api/articles/string")
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            message: "Bad Request",
          });
        });
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

describe("PATCH /api/articles/:article_id", () => {
  test("200: returns object of article with updated votes", () => {
    return request(app)
      .patch(`/api/articles/1`)
      .send({ inc_votes: 50 })
      .expect(200)
      .then(({ body }) => {
        const article = body.article;

        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 50,
        });
      });
  });

  test("200: for an empty body, returns object of article unchanged", () => {
    return request(app)
      .patch(`/api/articles/1`)
      .send({})
      .expect(200)
      .then(({ body }) => {
        const article = body.article;

        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
        });
      });
  });

  describe("404: article id doesn't exist", () => {
    test("404: article id doesn't exist", () => {
      return request(app)
        .patch("/api/articles/13")
        .send({ inc_votes: 50 })
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "article id doesn't exist",
          });
        });
    });
  });

  describe("400: article id is a string instead of a number", () => {
    test("400: Respond with error message that article id passed is not correct type", () => {
      return request(app)
        .patch("/api/articles/string")
        .send({ inc_votes: 50 })
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            message: "Bad Request",
          });
        });
    });
  });
  describe("400: body has incorrect key", () => {
    test("400: Respond with error message that key is incorrect", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc: 50 })
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            message: "Bad Request, body should include a key of inc_votes",
          });
        });
    });
  });

  describe("400: body has invalid value type for votes", () => {
    test("400: Respond with error message that votes must be an integer", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "string" })
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            message: "Bad Request",
          });
        });
    });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: return array of comments with given article_id, sorted by earliest date first", () => {
    return request(app)
      .get("/api/articles/1/comment")
      .expect(200)
      .then(({ body }) => {
        const commentsArray = body.comments;

        expect(commentsArray).toHaveLength(11);

        expect(commentsArray).toBeSortedBy("created_at", { descending: true });

        commentsArray.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              article_id: expect.any(Number),
              votes: expect.any(Number),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
            })
          );
        });
      });
  });

  test("200: return empty array for no comments for valid article id", () => {
    return request(app)
      .get("/api/articles/2/comment")
      .expect(200)
      .then(({ body }) => {
        const commentsArray = body.comments;
        expect(commentsArray).toEqual([]);
      });
  });

  describe("404: article id doesn't exist", () => {
    test("404: article id doesn't exist", () => {
      return request(app)
        .get("/api/articles/13/comment")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "article id doesn't exist",
          });
        });
    });
  });

  describe("400: article id is a string instead of a number", () => {
    test("400: Respond with error message that article id passed is not correct type", () => {
      return request(app)
        .get("/api/articles/string/comment")
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            message: "Bad Request",
          });
        });
    });
  });
});
