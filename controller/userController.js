const bcrypt = require('bcrypt');
const User = require('../model/Pepole');
const { unlink } = require('fs')
const path = require('path');
const userContoller = async (req, res, next) => {
    try {
        const data = await User.find();
        res.render('users', {
            user: data
        })

    } catch (err) { }

}

const addUser = async (req, res, next) => {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files[0] && req.files.length) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashedPassword
        });
    }

    try {

        await newUser.save();

        res.status(200).json({ msg: "User created successfully" });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            err: "server error"
        });
    }

}

const deleteUserContoller = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete({
            _id: req.params.id
        })

        if (user) {

            if (user.avatar) {
                unlink(
                    path.join(__dirname, `../../public/uploads/avatars/${user.avatar}`),
                    (err) => {
                        if (err) console.log(err)
                    }
                )
            }
        }
        res.status(200).json({
            action: true,
        })
    } catch (err) {
        console.log(err);
    }

}

module.exports = { userContoller, addUser, deleteUserContoller };