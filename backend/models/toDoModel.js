const mongoose = require('mongoose')

const toDoModel = mongoose.Schema({
    text: {type: String, require: [true, "Please Enter text"]},
    done: {type: Boolean, default: false},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
}, {
    timestamps: true
    }
);

module.exports = mongoose.model('toDo', toDoModel)