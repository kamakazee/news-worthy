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
          status: 404,
          message: "article id doesn't exist",
        });
      }
    });
};

const selectUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows: users }) => {
    return users;
  });
};

const setArticleById = (inc_votes, article_id) => {

  if (!inc_votes) {
    return Promise.reject({
      status: 400,
      message: "Body must include a key of inc_votes",
    });
  }

  return selectArticleById(article_id).then(()=>{

    return db
    .query(`UPDATE articles SET votes=$1 WHERE article_id=$2 RETURNING *;`, [
      inc_votes,
      article_id,
    ]).then(({ rows: article }) => {
          console.log(article.length, "article length inside model");
          if (article.length > 0) {
            return article[0];
          } else {
            console.log("Id doesn't exist, create a promise rejection");
            return Promise.reject({
              status: 404,
              message: "article id doesn't exist",
            });
          }
        }).catch((err)=>{
          if (err.code === "22P02") {
                  return Promise.reject({
                    status: 400,
                    message: "Votes must be an integer",
                  });
                }
        })
  })
};

module.exports = {
  selectTopics,
  selectUsers,
  selectArticles,
  selectArticleById,
  setArticleById,
};
