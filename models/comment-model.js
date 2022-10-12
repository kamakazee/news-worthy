const db = require("../db/connection.js");
const { selectArticleById } = require("./article-model.js");

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

const deleteCommentById = (comment_id) => {
  console.log("comment id: ", comment_id);
  return db
    .query(`DELETE FROM comments WHERE comment_id=$1 RETURNING *`, [comment_id])
    .then(({ rows: comments }) => {
      if(comments.length>0){
        return comments[0];
      }else{
        return Promise.reject({
          status: 404,
          message: "comment_id doesn't exist",
        });
      }
      
    });
};

module.exports = { selectCommentsByArticleId, deleteCommentById };
