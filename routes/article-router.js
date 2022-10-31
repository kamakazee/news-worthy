const articleRouter = require("express").Router();

const {
    getArticles,
    getArticleById,
    updateArticleById,
    postArticle
  } = require("../controllers/article-controller.js");

articleRouter.get("/", getArticles);

articleRouter.post("/", postArticle);

articleRouter.get("/:article_id", getArticleById);

articleRouter.patch("/:article_id", updateArticleById);

module.exports = { articleRouter };