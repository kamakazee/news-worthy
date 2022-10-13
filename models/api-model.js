const { dir } = require("console");
const fs = require("fs/promises");

const selectAPI = () => {
  console.log("Inside api model");

  return fs.readFile("./endpoints.json", "utf-8").then((data) => {

    const api = JSON.parse(data)
    return api
  });
};

module.exports = { selectAPI };
