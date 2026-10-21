'use strict'

const express = require('express')
const fakemonRoutes = require('./fakemon.routes')
const authRoutes = require('./auth.routes')

const router = express.Router()
router.use('/auth', authRoutes)

router.use('/fakemon', fakemonRoutes)

module.exports = router
// This is the route all additional url path addons past '/api/v1/'