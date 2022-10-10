const db = require("../db/connection.js");

const selectTopics = () => {
  return db.query(`SELECT * FROM topics`);
};

const selectArticles = () => {
  return db.query(`SELECT * FROM articles`);
};

module.exports = { selectTopics, selectArticles };
