const { response } = require("../app.js");
const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
} = require("../models/comment-model.js");

const getCommentsByArticleId = (request, response, next) => {
  const { article_id } = request.params;

  selectCommentsByArticleId(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postCommentByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  const { username, body: message } = request.body;

  insertCommentByArticleId(article_id, username, message).then((comment) => {
    response.status(200).send({ comment });
  });
};

module.exports = { getCommentsByArticleId, postCommentByArticleId };
