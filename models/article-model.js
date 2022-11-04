const db = require("../db/connection.js");
const { selectTopicDescByTopic } = require("./topic-model.js");

const { selectUserByUsername } = require("./user-model.js");

const selectArticles = (topic, sortby, order) => {

  const sortbyValid = ["created_at", "votes", "title", "topic", "author", "comment_count"]
  const orderValid = ["ASC", "DESC"]

  if(sortbyValid.includes(sortby) && orderValid.includes(order)){

    let stringQuery = `SELECT articles.*, COUNT(articles.article_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id`;

    if (topic) {
      stringQuery += ` WHERE articles.topic=$1`;
    }
  
    stringQuery += ` GROUP BY articles.article_id ORDER BY ${sortby} ${order}`;
  
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
    
  }else{
    return Promise.reject({
      status: 400,
      message: "Bad Request",
    });

  }

 
};

const selectArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.*, COUNT(articles.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id=$1 GROUP BY articles.article_id`,
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
          `UPDATE articles SET votes=votes+$1 WHERE article_id=$2 RETURNING *;`,
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

const insertArticle = (author, title, body, topic)=>{

  const values=[author, title, body, topic, 0]

  const promises = [selectUserByUsername(author), selectTopicDescByTopic(topic)]


  return Promise.all(promises).then((results)=>{

    return db.query(`INSERT INTO articles (author, title, body, topic, votes, created_at) VALUES ($1,$2,$3,$4, $5, current_timestamp) RETURNING *`,
  values).then(({rows:articles})=>{

    return articles[0]
  })

  })

}

const deleteArticleById = (article_id) => {


  console.log("Inside of model")
  return db
    .query(`DELETE FROM articles WHERE article_id=$1 RETURNING *`, [article_id])
    .then(({ rows: articles }) => {
      if (articles.length > 0) {
        return articles[0];
      } else {
        return Promise.reject({
          status: 404,
          message: "article_id doesn't exist",
        });
      }
    });
};
module.exports = {
  selectArticles,
  selectArticleById,
  setArticleById, insertArticle, deleteArticleById
};
