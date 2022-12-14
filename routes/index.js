const express = require("express");
const login = require("../controllers/auth/loginController");
const logout = require("../controllers/auth/logoutController");
const refresh = require("../controllers/auth/refreshController");
const register = require("../controllers/auth/registerController");
const me = require("../controllers/auth/userController");
const auth = require("../middlewares/auth");

// products
const {
  getAll_products,
  get_product,
  get_CartProduct,
  create_product,
  update_product,
  delete_product,
} = require("../controllers/products/productController");
const admin = require("../middlewares/admin");

// geoJSON
const {
  get_fruitFarm,
  create_fruitFarm,
} = require("../controllers/geoJson/geoJsonController");

const Router = express.Router();

// register route
Router.route("/register").post(register);

// login
Router.route("/login").post(login);
// logout
Router.route("/logout").post(logout);

// authorize the user through access token then show user details
Router.route("/me").post(auth, me);

// refresh token
Router.route("/refresh").post(refresh);

///////////////

// products

Router.route("/product")
  .get(getAll_products)
  .post([auth, admin], create_product);
Router.route("/product/:id")
  .get(get_product)
  .patch([auth, admin], update_product)
  .delete([auth, admin], delete_product);

Router.route("/product/cart-items").post(get_CartProduct);

// geoJson Route
Router.route("/fruitfarm").get(get_fruitFarm);

Router.route("/fruitfarm").post(create_fruitFarm);

module.exports = Router;
