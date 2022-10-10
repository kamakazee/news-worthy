const { selectTopics } = require("../models/topic-model.js");

const getTopics = (request, response) => {
  selectTopics().then(({ rows: topics }) => {
    //console.log(topics);
    response.status(200).send({ topics });
  });
};

module.exports = { getTopics };
