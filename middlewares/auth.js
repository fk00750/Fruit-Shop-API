const CustomErrorHandler = require("../utils/CustomErrorHandler");
const JwtService = require("../utils/JwtService");

const auth = async (req, res, next) => {
  // header
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }

  // access token
  const token = authHeader.split(" ")[1];

  try {
    // verify the user
    const { id, role } = await JwtService.verify(token);

    const user = {
      _id: id,
      role,
    };

    req.user = user;
    next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthorized());
  }
};

module.exports = auth