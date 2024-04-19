const express = require('express');
const { userContoller, addUser, deleteUserContoller } = require('../controller/userController');
const decorateHtmlResponsive = require('../middleware/common/decorateHtmlResponsive');
const avatarUpload = require('../utility/avatarUpload');
const { checkLogin,requireRole } = require('../middleware/common/checkLogin');
const { addUserValidation, userValidationResult } = require('../middleware/user/userValidetion');

const router = express.Router()

router.get('/', decorateHtmlResponsive("users"), checkLogin, requireRole(["admin"]), userContoller);

router.delete('/:id', deleteUserContoller);

router.post('/', avatarUpload, addUserValidation, userValidationResult, addUser);

module.exports = router;
