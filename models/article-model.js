const db = require("../db/connection.js");


const selectArticles = () => {
    return db.query(`SELECT * FROM articles`);
  };
  
  const selectArticleById = (article_id) => {
  
      return db
      .query(`SELECT articles.*, COUNT(articles.article_id) AS comment_count FROM articles JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id=$1 GROUP BY articles.article_id`, [article_id])
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
            
            if (article.length > 0) {
              return article[0];
            } else {
              
              return Promise.reject({
                status: 404,
                message: "article id doesn't exist",
              });
            }
          })
    })
  };

  module.exports = {
    selectArticles,
    selectArticleById,
    setArticleById,
  };
  