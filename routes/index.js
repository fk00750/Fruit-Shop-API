const express = require('express')
const login = require('../controllers/auth/loginController')
const refresh = require('../controllers/auth/refreshController')
const register = require('../controllers/auth/registerController')
const me = require('../controllers/auth/userController')
const auth = require('../middlewares/auth')

const Router = express.Router()

// register route
Router.route('/register').post(register)
Router.route('/login').post(login)

// authorize the user through access token then show user details
Router.route('/me').post(auth,me)

// refresh token
Router.route('/refresh').post(refresh)


module.exports = Router