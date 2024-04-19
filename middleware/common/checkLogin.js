const jwt = require('jsonwebtoken');
const createError = require('http-errors')
const checkLogin = (req, res, next) => {
    let cookies =
        Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookies) {
        try {
            const token = cookies['token'];
            const decoded = jwt.verify(token, process.env.jwtKey);
            req.user = decoded;

            if (res.locals.html) {
                res.locals.loggedinUser = decoded;
            }

            next();

        } catch (err) {
            if (res.locals.html) {
                res.redirect("/");
            } else {
                res.status(500).json({
                    errors: {
                        common: {
                            msg: "Autorision faild"
                        }
                    }
                });
            }
        }

    } else {

        if (res.locals.html) {
            res.redirect("/");
        } else {
            res.status(401).json({
                errors: {
                    common: {
                        msg: "Autorision faild"
                    }
                }
            });
        }
    }
}
 
const loggedIn = (req, res, next) => {
    let cookies =
        Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (!cookies) {
        next();
    } else {
        res.redirect("/inbox");
    }
}


const requireRole = (role) => {
    return  (req, res, next) => {
        console.log(req.user)
      if (req.user.role && role.includes(req.user.role)) {
        next();
      } else {
        if (res.locals.html) {
          next(createError(401, "You are not authorized to access this page!"));
        } else {
          res.status(401).json({
            errors: {
              common: {
                msg: "You are not authorized!",
              },
            },
          });
        }
      }
    };
  }

module.exports = { checkLogin, loggedIn ,requireRole};