const express = require("express");

const cors = require('cors');

const app = express();

app.use(cors());

const {apiRouter} = require("./routes/api-router.js");

const {topicRouter} = require("./routes/topic-router.js");

const {userRouter} = require("./routes/user-router.js");

const {articleRouter} = require("./routes/article-router.js");

const {
  getCommentsByArticleId,
  postCommentByArticleId,removeCommentById, updateCommentById, getComments, getCommentById
} = require("./controllers/comment-controller.js");

const { handlePsqlErrors, handleCustomErrors } = require("./errors/index.js");



app.use(express.json());

app.use('/api', apiRouter);

app.use('/api/topics', topicRouter);

app.use('/api/users', userRouter);

app.use('/api/articles', articleRouter);

app.get("/api/articles/:article_id/comment", getCommentsByArticleId);

app.delete("/api/comments/:comment_id", removeCommentById);

app.post("/api/articles/:article_id/comment", postCommentByArticleId);

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
