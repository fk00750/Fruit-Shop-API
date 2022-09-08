class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message = "username and password are wrong") {
    return new CustomErrorHandler(401, message);
  }
}

module.exports = CustomErrorHandler;
