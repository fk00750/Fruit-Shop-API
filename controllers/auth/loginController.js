const Joi = require("joi");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const { wrongCredentials } = require("../../utils/CustomErrorHandler");
const JwtService = require("../../utils/JwtService");
const RefreshToken = require("../../models/refreshToken");
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const login = async (req, res, next) => {
  // Login Schema
  const loginSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9f]{3,30}$")) // regrex expression for passwords
      .required(),
  });

  // error
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(wrongCredentials());
    }

    // compare passwords
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return next(wrongCredentials());
    }

    // token
    const access_token = JwtService.sign({ id: user._id, role: user.role });
    const refresh_token = JwtService.sign(
      { id: user._id, role: user.role },
      "1y",
      REFRESH_SECRET
    );

    // database whitelist for refresh token
    await RefreshToken.create({ token: refresh_token });

    res.json({ access_token, refresh_token });
  } catch (error) {
    return next(error);
  }
};

module.exports = login;
