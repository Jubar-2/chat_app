const uplaoder = require('../utility/uploader');

const avatarUpload = (req, res, next) => {

    const uploade = uplaoder(
        'avatars',
        ["image/jpeg", 'image/jpg', 'image/png'],
        1000000,
        "allowed jpeg , jpg or png"
    );

    uploade.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message
                    }
                }
            })
        } else {
            next();
        }
    });

}


module.exports = avatarUpload;