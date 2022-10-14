const {
  selectCommentsByArticleId,
  deleteCommentById,
  insertCommentByArticleId, selectComments, setCommentById
} = require("../models/comment-model.js");

const getCommentsByArticleId = (request, response, next) => {
  const { article_id } = request.params;

  selectCommentsByArticleId(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const removeCommentById = (request, response, next) => {
  const { comment_id } = request.params;

  deleteCommentById(comment_id)
    .then((comment) => {
      response.status(204).send();
  
    })
    .catch((err)=>{
      next(err)
    })
}

      
const postCommentByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  const { username, body: message } = request.body;

  insertCommentByArticleId(article_id, username, message)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

const getComments = (request, response)=>{

  selectComments().then((comments)=>{
    response.status(200).send({comments})
  })
}

const updateCommentById = (request, response, err)=>{

  const {comment_id}= request.params
  const {inc_votes} = request.body
  
  setCommentById(comment_id, inc_votes).then((comment)=>{
    response.status(200).send({comment})
  })


}

module.exports = { getCommentsByArticleId, removeCommentById, postCommentByArticleId, updateCommentById, getComments}
