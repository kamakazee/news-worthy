const db = require("../db/connection.js");
const { selectTopicDescByTopic } = require("./topic-model.js");

const selectArticles = (topic) => {
  let stringQuery = `SELECT articles.*, COUNT(articles.article_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id`;

  if (topic) {
    stringQuery += ` WHERE articles.topic=$1`;
  }

  stringQuery += ` GROUP BY articles.article_id`;

  if (topic) {
    return selectTopicDescByTopic(topic).then(() => {
      return db.query(stringQuery, [topic]).then(({ rows: articles }) => {
        return articles;
      });
    });
  } else {
    return db.query(stringQuery).then(({ rows: articles }) => {
      return articles;
    });
  }
};

const selectArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.*, COUNT(articles.article_id) AS comment_count FROM articles JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id=$1 GROUP BY articles.article_id`,
      [article_id]
    )
    .then(({ rows: articles }) => {
      if (articles.length > 0) {
        return articles[0];
      } else {
        return Promise.reject({
          status: 404,
          message: "article id doesn't exist",
        });
      }
    });
};

const setArticleById = (inc_votes, article_id, queryKeys) => {
  if (!inc_votes && queryKeys.length > 0) {
    return Promise.reject({
      status: 400,
      message: "Bad Request, body should include a key of inc_votes",
    });
  }

  return selectArticleById(article_id).then(() => {
    if (queryKeys.length === 0) {
      return db
        .query(`SELECT * from articles WHERE article_id=$1;`, [article_id])
        .then(({ rows: article }) => {
          if (article.length > 0) {
            return article[0];
          } else {
            return Promise.reject({
              status: 404,
              message: "article id doesn't exist",
            });
          }
        });
    } else {
      return db
        .query(
          `UPDATE articles SET votes=$1 WHERE article_id=$2 RETURNING *;`,
          [inc_votes, article_id]
        )
        .then(({ rows: article }) => {
          if (article.length > 0) {
            return article[0];
          } else {
            return Promise.reject({
              status: 404,
              message: "article id doesn't exist",
            });
          }
        });
    }
  });
};

module.exports = {
  selectArticles,
  selectArticleById,
  setArticleById,
};
