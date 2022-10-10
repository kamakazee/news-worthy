const db = require("../db/connection.js");

const selectTopics = () => {
  return db.query(`SELECT * FROM topics`);
};

const selectArticles = () => {
  return db.query(`SELECT * FROM articles`);
};

const selectArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then(({ rows: article }) => {
      if (article.length > 0) {
        return article[0];
      } else {
        return Promise.reject({
          status: 400,
          message: "article id doesn't exist",
        });
      }
    });
};

module.exports = { selectTopics, selectArticles, selectArticleById };
