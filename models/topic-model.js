const db = require("../db/connection.js");

const selectTopics = () => {
  return db.query(`SELECT * FROM topics`);
};

const selectTopicDescByTopic = (topic) => {
  return db
    .query(`SELECT * from topics WHERE slug=$1`, [topic])
    .then(({ rows: topics }) => {
      if (topics.length > 0) {
        return topics[0];
      } else {
        return Promise.reject({
          status: 404,
          message: "Topic doesn't exist",
        });
      }
    });
};

module.exports = {
  selectTopics,
  selectTopicDescByTopic,
};
