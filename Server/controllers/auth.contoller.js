const User = require('../models/User.model');
const { errorshandler } = require('../utils/error');
const bcrypt = require('bcrypt');
exports.singup = async (req, res, next) => {
    try {
        const { username, email, password, confirmpassword } = req.body;
        next("daf");
        if (!username || !email || !password || !confirmpassword) {
            console.log("Invalid")
            return res.status(403).json({
                success: false,
                message: "Enter all the required fields"
            });

        }
        if (password !== confirmpassword) {
            return res.status(401).json({
                success: false,
                message: "confirmpassword is not match with your password"
            });
        }
        const CheckUserPresent = await User.findOne({ email });
        if (CheckUserPresent) {
            console.log("CheckUserPresent")
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const Hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: Hashedpassword,
        });
        console.log(user);
        // errorshandler(201, "User created successfully");
        return res.status(201).json({
            success: true,
            message: "Account created successfullyy",
        })

    }
    catch (err) {
        next(err);
        console.log(`Error while singUp${err}`);
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }









}