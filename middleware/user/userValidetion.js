const { check,validationResult } = require('express-validator');
const { unlink } = require('fs');
const User = require('../../model/Pepole');
const path = require('path');
const createHttpError = require('http-errors');

const addUserValidation = [
    check('name')
        .isLength({min:1})
        .withMessage("name is required")
        .isAlpha("en-US",{ignore:" -"})
        .withMessage("Name is invalid")
        .trim(),

    check('email')
        .isLength({min:1})
        .withMessage("name is required")
        .isEmail()
        .withMessage("email is in valid")
        .custom(async (value) => {
            try{
                const email = await User.findOne({email:value});
                if(email){
                  throw  createHttpError("email is exists");
                }

            }catch(err){
                throw createHttpError(err.message);
            }
        })
        .trim(),
    
    check('mobile')
        .isLength({min:11,max:11})
        .withMessage("phone is required")
        .isNumeric()
        .withMessage("phone number is required")
        .custom(async (value) => {
            try{
                const mobile = await User.findOne({mobile:value});
                if(mobile){
                  throw  createHttpError("mobile number is exists");
                }

            }catch(err){
                throw createHttpError(err.message);
            }
        })
        .trim(),
    
    check('password').isLength({min:8,max:21})
        .withMessage("password is required")
    
];


const userValidationResult = (req, res, next) => {
    const error = validationResult(req);
    const mapedError = error.mapped();

    if(Object.keys(mapedError).length === 0){
        next();
    }else{
       
        if(req.files.length > 0 ){
        const { filename } = req.files[0];
        unlink(
            path.join(__dirname,`../../public/uploads/avatars/${filename}`),
            (err)=>{
                if(err)console.log(err)
            }
        )
    }
        res.status(500).json({
            errors: mapedError
        });
    }

   
}

module.exports = {addUserValidation,userValidationResult};