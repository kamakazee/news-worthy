const { selectTopics, selectUsers } = require("../models/topic-model.js");

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

module.exports = { getTopics, getUsers, getUsers };
