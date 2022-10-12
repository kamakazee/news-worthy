const {
  selectTopics,
  selectUsers,
  selectTopicDescByTopic,
} = require("../models/topic-model.js");

const getTopics = (request, response) => {
  selectTopics().then(({ rows: topics }) => {
    response.status(200).send({ topics });
  });
};

const getUsers = (request, response) => {
  selectUsers().then((users) => {
    response.status(200).send({ users });
  });
};

const getTopicDescByTopic = (request, response, next) => {
  const { topic } = request.params;
  selectTopicDescByTopic(topic)
    .then((topic) => {
      response.status(200).send({ topic });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getTopics,
  getUsers,
  getTopicDescByTopic,
};
