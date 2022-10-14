
const topicRouter = require("express").Router();

const {
    getTopics,
    getTopicDescByTopic,
  } = require("../controllers/topic-controller");


topicRouter.get("/", getTopics);

topicRouter.get("/:topic", getTopicDescByTopic);

module.exports = { topicRouter };