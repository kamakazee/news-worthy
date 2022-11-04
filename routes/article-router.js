const articleRouter = require("express").Router();

const {
    getArticles,
    getArticleById,
    updateArticleById,
    postArticle, removeArticleById
  } = require("../controllers/article-controller.js");

articleRouter.get("/", getArticles);

articleRouter.post("/", postArticle);

articleRouter.get("/:article_id", getArticleById);

articleRouter.patch("/:article_id", updateArticleById);

articleRouter.delete("/:article_id", removeArticleById);

module.exports = { articleRouter };
