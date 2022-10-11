const db = require("../db/connection.js");

const selectCommentsByArticleId = (article_id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id=$1;`, [article_id])
    .then(({ rows: comments }) => {
      //console.log(comments);
      return comments;
    });
};

module.exports = { selectCommentsByArticleId };
