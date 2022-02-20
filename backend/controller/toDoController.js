const asyncHandler = require('express-async-handler')
const toDo = require("../models/toDoModel")
const User = require('../models/userModel')

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
    const {id} = req.params
    if (!id) {
        res.status(400);
        throw new Erro("Missing Params");
    }
    const todo = await toDo.findById(id);

    if (!todo) {
        res.status(400);
        throw new Error("Item not found");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    if (todo.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User Not Authorized");
    }

    const todoUpdated = await toDo.findByIdAndUpdate(id, req.body, {
        new: true
    });

    res.status(200).json(todoUpdated);


});


//  @Details        Delete Task
//  @Path           DEL /api/todo/id
//  @visibility     Private
const deleteToDo = asyncHandler(async (req, res) => {
    const {id} = req.params
    if (!id) {
        res.status(400);
        throw new Erro("Missing Params");
    }
    const todo = await toDo.findById(id);

    if (!todo) {
        res.status(400);
        throw new Error("Item not found");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    if (todo.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User Not Authorized");
    }

    await todo.remove();
    res.status(200).json({id});
});


module.exports = {allToDo, addToDo, updateToDo, deleteToDo}