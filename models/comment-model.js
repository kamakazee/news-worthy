const db = require("../db/connection.js");
const { selectArticleById } = require("./article-model.js");
const { selectUserByUsername } = require("./user-model.js");

const selectCommentsByArticleId = (article_id) => {
  return selectArticleById(article_id).then(() => {
    return db
      .query(
        `SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at DESC;`,
        [article_id]
      )
      .then(({ rows: comments }) => {
        return comments;
      });
  });
};

const insertCommentByArticleId = (article_id, username, message) => {
  const promises = [
    selectArticleById(article_id),
    selectUserByUsername(username),
  ];

  const values = [message, username, article_id, 0];

  return Promise.all(promises).then((value) => {
    return db.query(`INSERT INTO comments (body, author, article_id, votes, created_at) VALUES ($1,$2,$3,$4,current_timestamp) RETURNING *`, values).then(({ rows: comments }) => {
      return comments[0];
    });
  });
};

module.exports = { selectCommentsByArticleId, insertCommentByArticleId };
