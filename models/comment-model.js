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

const deleteCommentById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id=$1 RETURNING *`, [comment_id])
    .then(({ rows: comments }) => {
      if (comments.length > 0) {
        return comments[0];
      } else {
        return Promise.reject({
          status: 404,
          message: "comment_id doesn't exist",
        });
      }
    });
};

const insertCommentByArticleId = (article_id, username, message) => {
  if (message.length === 0) {
    return Promise.reject({
      status: 400,
      message: "Comment body is empty",
    });
  }
  const promises = [
    selectArticleById(article_id),
    selectUserByUsername(username),
  ];

  const values = [message, username, article_id, 0];

  return Promise.all(promises).then((value) => {
    return db
      .query(
        `INSERT INTO comments (body, author, article_id, votes, created_at) VALUES ($1,$2,$3,$4,current_timestamp) RETURNING *`,
        values
      )
      .then(({ rows: comments }) => {
        return comments[0];
      });
  });
};

const selectComments = () => {
  return db.query(`SELECT * FROM comments`).then(({ rows: comments }) => {
    return comments;
  });
};

const selectCommentById = (comment_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
    .then(({ rows: comments }) => {
      if (comments.length > 0) {
        return comments[0];
      } else {
        return Promise.reject({
          status: 404,
          message: "comment id doesn't exist",
        });
      }
    });
};

const setCommentById = (comment_id, inc_votes, queryKeys) => {

  if (!inc_votes && queryKeys.length > 0) {
    return Promise.reject({
      status: 400,
      message: "Bad Request, body should include a key of inc_votes",
    });
  }

  if(queryKeys.length===0){

    return selectCommentById(comment_id).then((comment)=>{

      return comment
    })
    
  }else{

      return db
    .query(`UPDATE comments SET votes=votes+$1 WHERE comment_id=$2 RETURNING *;`, [
      inc_votes,
      comment_id,
    ])
    .then(({ rows: comments }) => {

      if(comments.length>0){
        return comments[0];
      } else{
        return Promise.reject({
          status: 404,
          message: "comment id doesn't exist",
        });
      }
    })

    }
};

const deleteCommentsByArticleId = (article_id) => {
  return db
    .query(`DELETE FROM comments WHERE article_id=$1 RETURNING *`, [article_id])
    .then(({ rows: comments }) => {
      if (comments.length > 0) {

        console.log(comments)
        return comments[0];
      } else {
        return Promise.reject({
          status: 404,
          message: "comment_id doesn't exist",
        });
      }
    });
};

module.exports = {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  deleteCommentById,
  setCommentById,
  selectComments,
  selectCommentById, deleteCommentsByArticleId
};
