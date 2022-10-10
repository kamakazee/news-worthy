const express = require("express");
const app = express();
const { handlePsqlErrors, handleCustomErrors } = require("./errors/index.js");
app.use(express.json());
const {
  getTopics,
  getArticles,
  getArticleById,
} = require("./controllers/topic-controller");

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.use((request, response, next) => {
  response.status(404).send({ status: 404, message: "endpoint doesn't exist" });
  next(err);
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;
