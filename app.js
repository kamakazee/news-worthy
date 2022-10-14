const express = require("express");

const {apiRouter} = require("./routes/api-router.js");

const {topicRouter} = require("./routes/topic-router.js");

const {userRouter} = require("./routes/user-router.js");

const {
  getArticles,
  getArticleById,
  updateArticleById,
} = require("./controllers/article-controller.js");

const {
  getCommentsByArticleId,
  postCommentByArticleId,removeCommentById
} = require("./controllers/comment-controller.js");

const { handlePsqlErrors, handleCustomErrors } = require("./errors/index.js");

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use('/api/topics', topicRouter);

app.use('/api/users', userRouter);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comment", getCommentsByArticleId);

app.delete("/api/comments/:comment_id", removeCommentById);

app.post("/api/articles/:article_id/comment", postCommentByArticleId);

app.patch("/api/articles/:article_id", updateArticleById);

app.use((request, response, next) => {
  response.status(404).send({ status: 404, message: "endpoint doesn't exist" });
  next(err);
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;
