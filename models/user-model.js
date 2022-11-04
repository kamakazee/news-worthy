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
      if (users.length > 0) {
        return users[0];
      } else {
        return Promise.reject({
          status: 404,
          message: "username doesn't exist",
        });
      }
    });
};


module.exports = {
  selectUsers,
  selectUserByUsername,
};
