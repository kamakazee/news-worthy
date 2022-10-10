const { selectTopics, selectArticles } = require("../models/topic-model.js");

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

module.exports = { getTopics, getArticles };
