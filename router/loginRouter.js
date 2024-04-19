const express = require('express');
const { getLogin, login, logout } = require('../controller/loginController');
const decorateHtmlResponsive = require('../middleware/common/decorateHtmlResponsive');
const { loginValidetion, loginValidetionResult } = require('../middleware/user/loginValidetion');
const {loggedIn} = require('../middleware/common/checkLogin');

const router = express.Router()

//view login page 
router.get('/', decorateHtmlResponsive("login page"),loggedIn, getLogin);

//login logic
router.post('/', decorateHtmlResponsive("login page"), loginValidetion, loginValidetionResult, login);

//logout 
router.delete('/', logout);

module.exports = router;
