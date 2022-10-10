const db = require("../db/connection.js");

const selectTopics = () => {
  return db.query(`SELECT * FROM topics`);
};

module.exports = { selectTopics };
