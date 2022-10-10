const express = require("express");
const app = express();
app.use(express.json());
const { getTopics, getUsers } = require("./controllers/topic-controller");

app.get("/api/topics", getTopics);

app.get("/api/users", getUsers);

app.use((request, response, next) => {
  response.status(404).send({ status: 404, message: "endpoint doesn't exist" });
  next(err);
});

module.exports = app;
