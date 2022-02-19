const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')

connectDB()


app.listen(process.env.PORT, () => {
    console.log(`Server Listening at port : ${process.env.PORT}`)
})