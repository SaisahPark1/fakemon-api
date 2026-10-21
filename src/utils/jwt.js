'use strict'

/** Everything jwt and token will touch this file in logins, logouts, and authorization */

// JWT stands for Javascript Web Token and is an industry standard for securely sending info

// Why use tokens instead of seesions?
// 3 base64 chunks with the secret and stuff makes it a far more secure option

/**
 * @params {object} user
 * @returns {string} a signed token
 */

const jwt = require('jsonwebtoken')
const {jwtSecret, jwtExpiresIn} = require('../config/env.js')

function signToken(user){
    /**
     * 'sub' or subject is the standard JWE claim for : Who is the token for
     * we keep the payload tiny on purpose so the id is the only thing to carry
     * We'll worry about roles later
     */

    const payload = {sub: String(user._id), role: user.role}
    return jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiresIn})
}

// Verify Token will throw its own error types using apiError

/**
 * @param {string} token
 * @param {{sub:string, role:string, iat:number, exp:number}}
*/

function verifyToken(token){
    try{
        return jwt.verify(token, jwtSecret)
    } catch (err) {
        /** this error covers forged signatures signed with a different secret!
         * DON'T be too detailed with the error response or hackers will use it
        */
       throw apiError.unauthorized('Invalid Token')
    }
}

module.exports = {signToken, verifyToken}