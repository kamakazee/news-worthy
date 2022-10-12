const {
  selectTopics,
  selectTopicDescByTopic,
} = require("../models/topic-model.js");

const {
  selectUsers,
} = require("../models/user-model.js");

const getTopics = (request, response) => {
  selectTopics().then(({ rows: topics }) => {
    response.status(200).send({ topics });
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
  getTopicDescByTopic,
};
