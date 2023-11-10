const authRoutes = require('express').Router()
const { logInController, registerController, authController } = require('../controller/auth')

authRoutes.post('/login', logInController)
authRoutes.post('/register', registerController)
authRoutes.get('/me', authController)

module.exports = authRoutes