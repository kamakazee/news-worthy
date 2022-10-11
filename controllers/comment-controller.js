const { response } = require("../app.js");
const { selectCommentsByArticleId } = require("../models/comment-model.js");

const getCommentsByArticleId = (request, response, next) => {
  console.log("Inside controller");

  const { article_id } = request.params;

  console.log(article_id, "params");

  selectCommentsByArticleId(article_id).then((comments) => {
    response.status(200).send({ comments });
  });
};

module.exports = { getCommentsByArticleId };
