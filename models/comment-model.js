const db = require("../db/connection.js");
const {selectArticleById} = require("./article-model.js")

const selectCommentsByArticleId = (article_id) => {

  return selectArticleById(article_id).then(()=>{

    return db
    .query(`SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at DESC;`, [article_id])
    .then(({ rows: comments }) => {
      console.log(comments);
      return comments;
    });


  })
  
};

module.exports = { selectCommentsByArticleId };
