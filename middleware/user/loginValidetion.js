const { check, validationResult } = require("express-validator");

const loginValidetion = [
    check('userName')
        .isLength({ min: 1 })
        .withMessage("name is required"),
    check('password').isLength({ min: 1 })
        .withMessage('password is requried')
        .isLength({ min: 8, max: 21 })
        .withMessage("password length is 8-21")
];

const loginValidetionResult = (req, res, next) => {
    const error = validationResult(req);
    if (Object.keys(error.mapped()).length === 0) {
        next();
    } else {
        res.render('login/login', {
            data: {
                username: req.body.userName
            },
            errors: error.mapped()
        })
    }
}

module.exports = { loginValidetion, loginValidetionResult };