const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandlerMiddleware')

// connect to mongo db
connectDB()

// add middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// /api/todo route
app.use('/api/todo', require('./routes/toDoRoutes'));
app.use('/api/user', require('./routes/userRoutes'));


app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server Listening at port : ${process.env.PORT}`)
});