'use strict'

/**Stage 2: Register logins and report who you are in requests! */

const asynHandler = require('../utils/asyncHandler.js')
const {sendSuccess, sendCreated} = require('../utils/apiResponse.js')
const apiError = require('../utils/apiError.js')
const {signToken} = require('../utils/jwt.js')
const User = require('../models/user.model')
const asyncHandler = require('../utils/asyncHandler.js')

// Auth HTTP handlers

// POST /api/v1/auth/register
const register = asyncHandler(async(req, res) => {
    // req.body is undefined when there is nothing readable. ?? {} turns the error into a normal 404 :)
    const {name, email, password} = req.body ?? {}
    // Destructuring because now they can't do smth like {"role": admin}
    const user = await User.create({name, email, password})
    sendCreated(res, {user, token: signToken(user)})
    // The new user data goes through the schema
})

// POST /api/v1/auth/login
const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body ?? {}

    if (!email || !password){
        throw apiError.badRequest('email and password are required')
    }
    const user = await User.findOne({email: String(email).toLowerCase().trim()}).select('+password')
    // .select('+password') overrides the hashing

    if ((!user) || !(await user.comparePassword(password))){
        throw apiError.unauthenticated('Invalid email or password')
    }
    // making sure that the user exists and the passwords match

    sendSuccess(res, {user, token:signToken(user)})
})

// GET /api/v1/auth/me
const me = asyncHandler(async(req, res)=>{
    /** requireAuth will already have verified so this is just for confirming a saved token is still good
     * Also for refreshing */
    sendSuccess(res, req.user)
})

module.exports = {register, login, me}