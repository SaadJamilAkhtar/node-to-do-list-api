const express = require('express')
const router = express.Router()
const controller = require('../controller/toDoController')
const authMiddleware = require('../middleware/authMiddleware')

router.route('/').get(authMiddleware, controller.allToDo).post(authMiddleware, controller.addToDo)

router.route('/:id').put(authMiddleware, controller.updateToDo).delete(authMiddleware, controller.deleteToDo)


module.exports = router