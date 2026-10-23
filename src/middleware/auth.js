'use strict'

const asyncHandler = require('../utils/asyncHandler.js')
const apiError = require('../utils/apiError.js')
const {verifyToken} = require('../utils/jwt.js')
const {AUTH} = require('../config/constants.js')
const User = require('../models/user.model.js')

// This requires a user to already be logged in this is for every request
// Users send in a token wrapped in the asynchandler because it needs to await the database response

const requireAuth = asyncHandler(async(req, res, next)=>{
    const header = req.get('authorization')

    if(!header.startsWith(AUTH.BEARER_PREFIX)){
        throw apiError.unauthenticated('Missing or malformed Authorization header')
    }

    const token = header.slice(AUTH.BEARER_PREFIX.length).trim()
    if (!token) throw apiError.unauthenticated('Missing or malformed auth header')

    const payload = verifyToken(token)

    const user = await User.findById(payload.sub)
    if (!user) throw apiError.unauthenticated('This account no longer exists')
    // The user is loaded instead of trusting the payload because the account could expire or change before the token
    req.user = user
    next()
})

module.exports = {requireAuth}