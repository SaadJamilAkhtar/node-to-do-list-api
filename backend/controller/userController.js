const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const e = require("express");
//  @Details        Add User
//  @Path           POST /api/user
//  @visibility     Public
const addUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all fields")
    }

    const userExist = await User.findOne({email});

    if (userExist) {
        res.status(400);
        throw new Error("User Already Exists")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    console.log(user._id)

    if (user) {
        res.status(200);
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: getToken(user._id)
        })

    }
    res.status(400);
    throw new Error('Invalid User Data')


})

//  @Details        Login User
//  @Path           POST /api/user/login
//  @visibility     Public
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400);
        throw new Error("Missing Credentials")
    }

    const user = await User.findOne({email});

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200);
        return res.json({
            name: user.name,
            email: user.email,
            token: getToken(user._id)
        });
    }

    throw new Error("Invalid Credentials")

})


//  @Details        Get User
//  @Path           GET /api/user/me
//  @visibility     Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200);
    res.json({
        _id,
        name,
        email
    });
})

const getToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {addUser, login, getMe}