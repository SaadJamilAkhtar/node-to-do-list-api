const express = require('express')
const router = express.Router()
const controller = require('../controller/userController')
const authMiddleware = require("../middleware/authMiddleware")

router.post('/', controller.addUser)
router.post('/login', controller.login)
router.get('/me', authMiddleware, controller.getMe)

module.exports = router