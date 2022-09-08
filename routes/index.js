const express = require('express')
const login = require('../controllers/auth/loginController')
const register = require('../controllers/auth/registerController')

const Router = express.Router()


// register route
Router.route('/register').post(register)
Router.route('/login').post(login)

module.exports = Router