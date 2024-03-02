const bcryptjs = require('bcrypt');
const UserModel = require("../models/User.model");




exports.updateUserdetials = async (req, res) => {
    if (req.user.id != req.params.id) {
        return res(401).json({
            success: false,
            message: `Unauthorized access`
        })
    }
    try {
        console.log("Welcome")
        if (req.body.password)
            req.body.password = bcryptjs.hashSync(req.body.password, 10);



        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            updatedUser,
        })
    } catch (e) {
        console.log("fat")
        return res.status(403).json({
            success: false,
            message: e.message,
        })
    }
}


exports.deleteUser = async (req, res) => {
    console.log("deleteUser", req.user.id)
    if (req.user.id !== req.params.id) {
        return res(401).json({
            success: false,
            message: `Unauthorized access`
        })
    }
    try {

        await UserModel.findByIdAndDelete(req.user.id);
        res.clearCookie('token');
        return res.status(200).json({
            success: true,
            message: `User deleted successfully`
        })
    }
    catch (e) {
        return res.status(403).json({
            success: false,
            message: e.message
        });
    }
}