const {
  selectTopics,
  selectArticles,
  selectArticleById,
} = require("../models/topic-model.js");

const getTopics = (request, response) => {
  selectTopics().then(({ rows: topics }) => {
    response.status(200).send({ topics });
  });
};

const getArticles = (request, response) => {
  selectArticles().then(({ rows: articles }) => {
    response.status(200).send({ articles });
  });
};

const getArticleById = (request, response) => {
  const { article_id } = request.params;

  selectArticleById(article_id).then((article) => {
    response.status(200).send({ article });
  });
};

module.exports = { getTopics, getArticles, getArticleById };