const Joi = require("joi");
const RefreshToken = require("../../models/refreshToken");
const User = require("../../models/user");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");
const JwtService = require("../../utils/JwtService");
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const refreshController = async (req, res, next) => {
  // validation
  const refreshSchema = Joi.object({
    refresh_token: Joi.string().required(),
  });

  const { error } = refreshSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  let refreshtoken;
  try {
    refreshtoken = await RefreshToken.findOne({
      token: req.body.refresh_token,
    });

    if (!refreshtoken) {
      return next(CustomErrorHandler.unAuthorized("Invalid Refresh Token"));
    }

    let userId;
    try {
      const { id: _id } = await JwtService.verify(
        refreshtoken.token,
        REFRESH_SECRET
      );

      userId = _id;
    } catch (error) {
      return next(CustomErrorHandler.unAuthorized("Invalid Refresh Token"));
    }

    // user
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return next(CustomErrorHandler.unAuthorized("User Not Found"));
    }

    // create new tokens
    const access_token = JwtService.sign({ id: user._id, role: user.role });
    const refresh_token = JwtService.sign(
      { id: user.id, role: user.role },
      "1y",
      REFRESH_SECRET
    );

    // database white list
    await RefreshToken.create({ token: refresh_token });

    res.json({ access_token, refresh_token });
  } catch (error) {
    return next(new Error("Something went wrong" + error.message));
  }
};

module.exports = refreshController;
