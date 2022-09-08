const Joi = require("joi");
const UserModel = require("../../models/user");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const JwtService = require("../../utils/JwtService");

const register = async (req, res, next) => {
  // Register schema
  const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9f]{3,30}$")) // regrex expression for passwords
      .required(),
    repeat_password: Joi.ref("password"),
  });

  // check for error
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  // checking if user exists in database
  try {
    const exist = await UserModel.exists({ email: req.body.email });

    if (exist) {
      return next(
        CustomErrorHandler.alreadyExist("This email is already taken")
      );
    }
  } catch (error) {
    return next(error);
  }

  // saving user into database
  const { name, email, password } = req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    name,
    email,
    password: hashedPassword,
  });

  let access_token;
  try {
    const result = await user.save();
    console.log(result);

    // creating access token
    access_token = JwtService.sign({ id: result._id, role: result.role });
  } catch (error) {
    return next(error);
  }

  res.send({ access_token });
  // boss "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWEzMDYzY2VhMTE5OGJiMDQyYzgxNiIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY2MjY2MDcwNywiZXhwIjoxNjY1MjUyNzA3fQ.beBkY3oZH-6DPBCKhk46LNgWx11qgUyU_BA92SbhPIg"
};

module.exports = register;
