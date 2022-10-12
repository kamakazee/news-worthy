const db = require("../db/connection.js");

const selectUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows: users }) => {
    return users;
  });
};

const selectUserByUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username=$1`, [username])
    .then(({ rows: users }) => {
      return users[0];
    });
};

module.exports = {
  selectUsers,
  selectUserByUsername,
};
