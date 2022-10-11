const express = require("express");

const { getTopics, getUsers } = require("./controllers/topic-controller");

const {
  getArticles,
  getArticleById,
  updateArticleById,
} = require("./controllers/article-controller.js");

const { handlePsqlErrors, handleCustomErrors } = require("./errors/index.js");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/users", getUsers);

app.patch("/api/articles/:article_id", updateArticleById);

app.use((request, response, next) => {
  response.status(404).send({ status: 404, message: "endpoint doesn't exist" });
  next(err);
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;
