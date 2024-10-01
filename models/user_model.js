const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    userPath : {
        type : String,
        required : true
    }
})

const admin_model = mongoose.model("users", userSchema);

module.exports = admin_model;