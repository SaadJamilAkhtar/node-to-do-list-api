const asyncHandler = require('express-async-handler')
const toDo = require("../models/toDoModel")

//  @Details        Get all To Do Tasks
//  @Path           GET /api/todo
//  @visibility     Private
const allToDo = asyncHandler(async (req, res) => {
    const todos = await toDo.find({user: req.user.id})
    res.status(200);
    res.json(todos)
});

//  @Details        Add task
//  @Path           POST /api/todo
//  @visibility     Private
const addToDo = asyncHandler(async (req, res) => {
    const {text} = req.body;

    if (!text) {
        res.status(400);
        throw new Error("Please Provide Text of To Do.")
    }

    const todo = await toDo.create({
        text: text,
        user: req.user.id
    })

    if (todo) {
        res.status(201);
        return res.json(todo);
    }

    res.status(500);
    throw new Error("Could not create To Do. Try Again.");

});

//  @Details        Updated Task
//  @Path           PUT /api/todo/id
//  @visibility     Private
const updateToDo = asyncHandler(async (req, res) => {

});


//  @Details        Delete Task
//  @Path           DEL /api/todo/id
//  @visibility     Private
const deleteToDo = asyncHandler(async (req, res) => {
    res.json({message: "to do list delete"});
});


module.exports = {allToDo, addToDo, updateToDo, deleteToDo}