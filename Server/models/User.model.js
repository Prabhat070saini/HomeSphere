// import mongoose from "mongoose";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,


    },

}, { timeseries: true },);


module.exports = mongoose.model("user", userSchema);

// <-------------------------------Atlernative------------------------>
// const User=mongoose.model("User",userSchema);
// export default User;