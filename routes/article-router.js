const articleRouter = require("express").Router();

const {
    getArticles,
    getArticleById,
    updateArticleById,
  } = require("../controllers/article-controller.js");

articleRouter.get("/", getArticles);

articleRouter.get("/:article_id", getArticleById);

articleRouter.patch("/:article_id", updateArticleById);

module.exports = { articleRouter };
