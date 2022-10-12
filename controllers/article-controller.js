const {
  selectArticles,
  selectArticleById,
  setArticleById,
} = require("../models/article-model.js");

const getArticles = (request, response, next) => {
  const { topic } = request.query;

  //console.log("topic", topic)

  selectArticles(topic)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleById = (request, response, next) => {
  const { article_id } = request.params;

  selectArticleById(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const updateArticleById = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  const queryKeys = Object.keys(request.body);

  setArticleById(inc_votes, article_id, queryKeys)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getArticles,
  getArticleById,
  updateArticleById,
};
