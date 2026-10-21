'use strict'

const express = require('express')
const authController = require('../controllers/auth.controller.js')
const {requireAuth} = require('../middleware/auth')

const router = express.Router()

// Public Routes: you cannot be logged in yet when you are asking to log in
router.post('/register', authController.register)
router.post('/login', authController.login)

/**Protected Routes: requireAuth runs first and either sets req.user or ends with a 401
 * Listing middleware runs before the route handler
 */
router.get('/me', requireAuth, authController.me)

module.exports = router