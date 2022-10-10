const {
  selectTopics,
  selectArticles,
  selectArticleById,
  selectUsers,
  setArticleById,
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

const getUsers = (request, response) => {
  selectUsers().then((users) => {
    response.status(200).send({ users });
  });
};

const updateArticleById = (request, response, next) => {

  const { article_id } = request.params;
  const { inc_votes } = request.body;

  setArticleById(inc_votes, article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getTopics,
  getUsers,
  getUsers,
  getArticles,
  getArticleById,
  updateArticleById,
};
