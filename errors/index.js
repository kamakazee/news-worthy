const handlePsqlErrors = (err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ status: 400, message: "Bad Request" });
  } else {
    next(err);
  }
};

const handleCustomErrors = (err, request, response, next) => {
  if (err.status && err.message) {
    response.status(err.status).send(err);
  } else {
    next(err);
  }
};

module.exports = { handlePsqlErrors, handleCustomErrors };
