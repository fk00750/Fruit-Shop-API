const User = require("../../models/user");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");

const me = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select(
      "-password -updateAt -createdAt -__v"
    );

    if(!user) {
        return next(CustomErrorHandler.notFound())
    }

    res.json(user)
  } catch (error) {
    return next(error)
  }
};

module.exports = me
