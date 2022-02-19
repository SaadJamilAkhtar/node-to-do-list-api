const mongoose = require('mongoose')

const User = mongoose.Schema({
    name: {type: String, required: [true, "Please Enter name"]},
    email: {type: String, required: [true, "Please Enter Email"]},
    password: {type: String, required: [true, "Please Enter Password"]}
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User)