const Joi = require("joi");
const RefreshToken = require("../../models/refreshToken");

const logout = async (req,res,next) => {
  // validation
  const refreshSchema = Joi.object({
    refresh_token: Joi.string().required(),
  });

  const { error } = refreshSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  try {
    await RefreshToken.deleteOne({ token: req.body.refresh_token });
  } catch (error) {
    return next(new Error("Something went wrong"));
  }

  res.json({ status : 1})
};

module.exports = logout