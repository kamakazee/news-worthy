const { response } = require("../app.js");
const {
  selectCommentsByArticleId,
  deleteCommentById,
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

const removeCommentById = (request, response, next) => {
  const { comment_id } = request.params;

  deleteCommentById(comment_id)
    .then((comment) => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCommentsByArticleId, removeCommentById };
