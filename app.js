const express = require("express");

const {getAPI} = require("./controllers/api-controller");

const {
  getTopics,
  getTopicDescByTopic,
} = require("./controllers/topic-controller");

const {
  getUsers,
  getUserByUsername,
} = require("./controllers/user-controller.js");

const {
  getArticles,
  getArticleById,
  updateArticleById,
} = require("./controllers/article-controller.js");

const {
  getCommentsByArticleId,
  postCommentByArticleId,removeCommentById, updateCommentById, getComments, getCommentById
} = require("./controllers/comment-controller.js");

const { handlePsqlErrors, handleCustomErrors } = require("./errors/index.js");

const app = express();

app.use(express.json());

app.get("/api", getAPI);

app.get("/api/topics", getTopics);

app.get("/api/topics/:topic", getTopicDescByTopic);

app.get("/api/users", getUsers);

app.get("/api/users/:username", getUserByUsername);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comment", getCommentsByArticleId);

app.delete("/api/comments/:comment_id", removeCommentById);

app.post("/api/articles/:article_id/comment", postCommentByArticleId);

app.patch("/api/articles/:article_id", updateArticleById);

app.get("/api/comments", getComments);

app.get("/api/comments/:comment_id", getCommentById);

app.patch("/api/comments/:comment_id", updateCommentById);

app.use((request, response, next) => {
  response.status(404).send({ status: 404, message: "endpoint doesn't exist" });
  next(err);
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;
