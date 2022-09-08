const { ValidationError } = require("joi");
const CustomErrorHandler = require("../utils/CustomErrorHandler");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;

  // default error msg
  let data = {
    message: "Internal Server Error",
    errorMessage: err.message,
  };

  // if the error is from registeration validiton from joi
  if (err instanceof ValidationError) {
    statusCode = 422;
    let data = {
      errorMessage: err.message,
    };
  }

  // custom error messages
  if (err instanceof CustomErrorHandler) {
    console.log(
      "Instance of CustomErrorHandler.js message from ErrorHandler.js file"
    );
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

module.exports = errorHandler;
