const apiRouter = require("express").Router();

const { getAPI } = require("../controllers/api-controller");

apiRouter.get("/", getAPI);

module.exports = { apiRouter };
