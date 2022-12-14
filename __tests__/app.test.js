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

  describe("GET api/articles sortby and order by queries", () => {
    test("200: respond with array of articles sort by default of date descending", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const articlesArray = body.articles;

          expect(articlesArray).toHaveLength(12);

          expect(articlesArray).toBeSortedBy("created_at", {
            descending: true,
          });

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
    test("200: respond with array of articles sorted by author", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(({ body }) => {
          const articlesArray = body.articles;

          expect(articlesArray).toHaveLength(12);

          expect(articlesArray).toBeSortedBy("author", {
            descending: true,
          });

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
    test("200: respond with array of articles ordered by ascending", () => {
      return request(app)
        .get("/api/articles?order=ASC")
        .expect(200)
        .then(({ body }) => {
          const articlesArray = body.articles;

          expect(articlesArray).toHaveLength(12);

          expect(articlesArray).toBeSortedBy("created_at", {
            descending: false,
          });

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
    test("200: respond with array of articles sort by author and ascending", () => {
      return request(app)
        .get("/api/articles?sort_by=author&&order=ASC")
        .expect(200)
        .then(({ body }) => {
          const articlesArray = body.articles;

          expect(articlesArray).toHaveLength(12);

          expect(articlesArray).toBeSortedBy("author", { descending: false });

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
  });
  describe("400: sort_by and order not on whitelist", () => {
    test("400: return message to indicate bad request", () => {
      return request(app)
        .get("/api/articles?sort_by='Drop nc_news'")
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            message: "Bad Request",
          });
        });
    });
  });

  describe("400: invalid order by", () => {
    test("400: return message of bad request", () => {
      return request(app)
        .get("/api/articles?order=random")
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            message: "Bad Request",
          });
        });
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

describe("GET api/users/:username", () => {
  test("200: returns object of user requsted by usermame", () => {
    return request(app)
      .get("/api/users/icellusedkars")
      .expect(200)
      .then(({ body }) => {
        const user = body.user;
        expect(user).toEqual({
          username: "icellusedkars",
          name: "sam",
          avatar_url:
            "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
        });
      });
  });
  describe("404: Username doesn't exist", () => {
    test("404: Returns message that username doesn't exist", () => {
      return request(app)
        .get("/api/users/billywhoisbilly")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "username doesn't exist",
          });
        });
    });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: returns object of article with updated votes", () => {
    return request(app)
      .patch(`/api/articles/1`)
      .send({ inc_votes: 2 })
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
          votes: 102,
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

describe("POST api/articles/:article_id/comments", () => {
  test("201: returns object of newly created comment, ", () => {
    return request(app)
      .post(`/api/articles/1/comment`)
      .send({
        username: "icellusedkars",
        body: "blah blah blah blah something newsy blah blah blah",
      })
      .expect(201)
      .then(({ body }) => {
        const comment = body.comment;

        expect(comment).toEqual({
          comment_id: expect.any(Number),
          article_id: 1,
          author: "icellusedkars",
          body: "blah blah blah blah something newsy blah blah blah",
          created_at: expect.any(String),
          votes: 0,
        });
      });
  });

  test("201: returns object of newly created comment, additional keys are ignored ", () => {
    return request(app)
      .post(`/api/articles/1/comment`)
      .send({
        username: "icellusedkars",
        body: "blah blah blah blah something newsy blah blah blah",
        votes: 1000,
      })
      .expect(201)
      .then(({ body }) => {
        const comment = body.comment;

        expect(comment).toEqual({
          comment_id: expect.any(Number),
          article_id: 1,
          author: "icellusedkars",
          body: "blah blah blah blah something newsy blah blah blah",
          created_at: expect.any(String),
          votes: 0,
        });
      });
  });

  describe("404: article id doesn't exist", () => {
    test("404: returns message, article id doesnt exist", () => {
      return request(app)
        .post(`/api/articles/13/comment`)
        .send({
          username: "icellusedkars",
          body: "blah blah blah blah something newsy blah blah blah",
        })
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "comment_id doesn't exist",
            message: "article id doesn't exist",
          });
        });
    });
  });

  describe("400: article id is wrong type", () => {
    test("400: returns message of bad request", () => {
      return request(app)
        .post(`/api/articles/number/comment`)
        .send({
          username: "icellusedkars",
          body: "blah blah blah blah something newsy blah blah blah",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            message: "Bad Request",
          });
        });
    });
  });
  describe("404: username in body doesn't exist", () => {
    test("404: returns message that username doesnt exist", () => {
      return request(app)
        .post(`/api/articles/1/comment`)
        .send({
          username: "somebodyanybody",
          body: "blah blah blah blah something newsy blah blah blah",
        })
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "username doesn't exist",
          });
        });
    });
  });

  describe("400: body of comment is empty", () => {
    test("400: returns message of Comment body is empty", () => {
      return request(app)
        .post(`/api/articles/number/comment`)
        .send({
          username: "somebodyanybody",
          body: "",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            message: "Comment body is empty",
          });
        });
    });
  });
});

describe("204: delete comment by comment_id", () => {
  test("204: returns no content on completion", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  describe("404: comment_id doesn't exist", () => {
    test("404: returns message of id doesn't exist", () => {
      return request(app)
        .delete("/api/comments/50")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "comment_id doesn't exist",
          });
        });
    });
  });

  describe("400: comment_id is wrong type", () => {
    test("400: returns message of Bad Request", () => {
      return request(app)
        .delete("/api/comments/notanumber")
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

describe("GET /api serves up a json representation of all the available endpoints of the api", () => {
  test("200: responds with an object with the following keys to represent endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const api = body.api;

        expect(Object.keys(api)).toHaveLength(14);

        expect(api).toEqual(
          expect.objectContaining({
            "GET /api": expect.any(Object),
            "GET /api/topics": expect.any(Object),
            "GET /api/topics/:topic": expect.any(Object),
            "GET /api/users": expect.any(Object),
            "GET /api/users/:username": expect.any(Object),
            "GET /api/articles": expect.any(Object),
            "GET /api/articles/:article_id": expect.any(Object),
            "GET /api/articles/:article_id/comment": expect.any(Object),
            "DELETE /api/comments/:comment_id": expect.any(Object),
            "POST /api/articles/:article_id/comment": expect.any(Object),
            "PATCH /api/articles/:article_id": expect.any(Object),
            "GET /api/comments": expect.any(Object),
            "GET /api/comments/:comment_id": expect.any(Object),
            "PATCH /api/comments/:comment_id": expect.any(Object),
          })
        );
      });
  });
});

describe("GET api/comments/:comment_id", () => {
  test("200: respond with all comments for endpoint of api/comments", () => {
    return request(app)
      .get("/api/comments")
      .expect(200)
      .then(({ body }) => {
        const commentsArray = body.comments;
        expect(commentsArray).toHaveLength(18);

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

  test("200: respond with comment as requested by comment id", () => {
    return request(app)
      .get("/api/comments/1")
      .expect(200)
      .then(({ body }) => {
        const comment = body.comment;

        expect(comment).toEqual({
          comment_id: 1,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          article_id: 9,
          author: "butter_bridge",
          votes: 16,
          created_at: "2020-04-06T12:17:00.000Z",
        });
      });
  });

  test("200: respond with comment as requested by comment id", () => {
    return request(app)
      .get("/api/comments/3")
      .expect(200)
      .then(({ body }) => {
        const comment = body.comment;

        expect(comment).toEqual({
          comment_id: 3,
          body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy ??? onyou it works.",
          votes: 100,
          author: "icellusedkars",
          article_id: 1,
          created_at: "2020-03-01T01:13:00.000Z",
        });
      });
  });

  describe("404: comment id id doesn't exist", () => {
    test("404: comment id doesn't exist", () => {
      return request(app)
        .get("/api/comments/19")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "comment id doesn't exist",
          });
        });
    });
  });

  describe("400: comment id is a string instead of a number", () => {
    test("400: Respond with error message that is a bad request", () => {
      return request(app)
        .get("/api/comments/string")
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

describe("PATCH /api/comments/:comment_id", () => {
  test("200: returns object of article with updated votes", () => {
    return request(app)
      .patch(`/api/comments/1`)
      .send({ inc_votes: 10 })
      .expect(200)
      .then(({ body }) => {
        const comment = body.comment;

        expect(comment).toEqual({
          comment_id: 1,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          article_id: 9,
          author: "butter_bridge",
          votes: 26,
          created_at: "2020-04-06T12:17:00.000Z",
        });
      });
  });

  test("200: for an empty body, returns object of comment unchanged", () => {
    return request(app)
      .patch(`/api/comments/1`)
      .send({})
      .expect(200)
      .then(({ body }) => {
        const comment = body.comment;

        expect(comment).toEqual({
          comment_id: 1,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          article_id: 9,
          author: "butter_bridge",
          votes: 16,
          created_at: "2020-04-06T12:17:00.000Z",
        });
      });
  });

  describe("404: comment id doesn't exist", () => {
    test("404: comment id doesn't exist", () => {
      return request(app)
        .patch("/api/comments/19")
        .send({ inc_votes: 50 })
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "comment id doesn't exist",
          });
        });
    });
  });

  describe("400: comment id is a string instead of a number", () => {
    test("400: Respond with error message that comment id passed is not correct type", () => {
      return request(app)
        .patch("/api/comments/string")
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
        .patch("/api/comments/1")
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
        .patch("/api/comments/1")
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

describe("POST api/articles", () => {
  test("201: returns object of newly created article, ", () => {
    return request(app)
      .post(`/api/articles`)
      .send({
        author: "icellusedkars",
        title: "Some new title",
        body: "blah blah blah blah something newsy blah blah blah",
        topic: "paper",
      })
      .expect(201)
      .then(({ body }) => {
        const article = body.article;

        expect(article).toEqual({
          title: "Some new title",
          topic: "paper",
          author: "icellusedkars",
          body: "blah blah blah blah something newsy blah blah blah",
          created_at: expect.any(String),
          votes: 0,
          article_id: 13,
        });
      });
  });

  test("201: returns object of newly created article, additional keys are ignored", () => {
    return request(app)
      .post(`/api/articles`)
      .send({
        author: "icellusedkars",
        title: "Some new title",
        body: "blah blah blah blah something newsy blah blah blah",
        topic: "paper",
        funkykey: "fsharp",
      })
      .expect(201)
      .then(({ body }) => {
        const article = body.article;

        expect(article).toEqual({
          title: "Some new title",
          topic: "paper",
          author: "icellusedkars",
          body: "blah blah blah blah something newsy blah blah blah",
          created_at: expect.any(String),
          votes: 0,
          article_id: 13,
        });
      });
  });

  test("201: returns object of newly created article, empty body", () => {
    return request(app)
      .post(`/api/articles`)
      .send({
        author: "icellusedkars",
        title: "Some new title",
        body: "",
        topic: "paper",
        funkykey: "fsharp",
      })
      .expect(201)
      .then(({ body }) => {
        const article = body.article;

        expect(article).toEqual({
          title: "Some new title",
          topic: "paper",
          author: "icellusedkars",
          body: "",
          created_at: expect.any(String),
          votes: 0,
          article_id: 13,
        });
      });
  });

  describe("404: author doesn't exist", () => {
    test("404: returns message, author doesnt exist", () => {
      return request(app)
        .post(`/api/articles`)
        .send({
          author: "unknown",
          title: "Some new title",
          body: "blah blah blah blah something newsy blah blah blah",
          topic: "paper",
          funkykey: "fsharp",
        })
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "username doesn't exist",
          });
        });
    });
  });

  describe("404: topic doesn't exist", () => {
    test("404: returns message, topic doesnt exist", () => {
      return request(app)
        .post(`/api/articles`)
        .send({
          author: "icellusedkars",
          title: "Some new title",
          body: "blah blah blah blah something newsy blah blah blah",
          topic: "blah",
          funkykey: "fsharp",
        })
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "Topic doesn't exist",
          });
        });
    });
  });

  describe("404: Missing body key", () => {
    test("404: returns message, missing keys", () => {
      return request(app)
        .post(`/api/articles`)
        .send({
          author: "icellusedkars",
          title: "Some new title",
          topic: "paper",
          funkykey: "fsharp",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            message: "Missing keys",
          });
        });
    });
  });
});

describe("204: delete article by article_id", () => {
  test("204: returns no content on completion", () => {
    return request(app)
      .delete("/api/articles/1")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  describe("404: comment_id doesn't exist", () => {
    test("404: returns message of id doesn't exist", () => {
      return request(app)
        .delete("/api/articles/200")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "article_id doesn't exist",
          });
        });
    });
  });

  describe("400: comment_id is wrong type", () => {
    test("400: returns message of Bad Request", () => {
      return request(app)
        .delete("/api/articles/notanumber")
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

describe("204: delete comments by article_id", () => {
  test("204: returns no content on completion", () => {
    return request(app)
      .delete("/api/article/comments/1")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  describe("404: comment_id doesn't exist", () => {
    test("404: returns message of id doesn't exist", () => {
      return request(app)
        .delete("/api/article/comments/200")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            message: "article_id doesn't exist",
          });
        });
    });
  });

  describe("400: comment_id is wrong type", () => {
    test("400: returns message of Bad Request", () => {
      return request(app)
        .delete("/api/article/comments/notanumber")
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
