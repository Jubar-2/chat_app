const User = require('../model/Pepole');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');


const getLogin = (req, res, next) => {
    res.render('login/login')
}

const login = async (req, res, next) => {

    try {
        const user = await User.findOne({
            $or: [{ email: req.body.userName }, { mobile: req.body.userName }],
        });

        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password

            );

            if (isValidPassword) {
                const userObject = {
                    userid: user._id,
                    userName: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role
                }

                const token = jwt.sign(userObject, process.env.jwtKey, {
                    expiresIn: 100000000
                });

                res.cookie('token', token, {
                    maxAge: 100000000,
                    httpOnly: true,
                    signed: true
                });

                res.locals.loggedinUser = userObject;

                res.render('inbox');

            }
        } else {
            throw createHttpError("login failed please try agin")
        }

    } catch (err) {
        res.render('login/login', {
            errors: {
                common: {
                    msg: err.message
                }
            }
        })
    }
}


const logout = (req, res, next) => {
    res.clearCookie('token');
    res.send("logged out");
}

module.exports = { getLogin, login, logout };