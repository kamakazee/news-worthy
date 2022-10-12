const {
  selectUsers,
  selectUserByUsername,
} = require("../models/user-model.js");

const getUsers = (request, response, next) => {
  selectUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

const getUserByUsername = (request, response, next) => {
  const { username } = request.params;

  selectUserByUsername(username).then((user) => {
    response.status(200).send({user})
  });
  
};

module.exports = {
  getUsers,
  getUserByUsername,
};
