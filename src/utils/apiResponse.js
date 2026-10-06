'use strict'

/**
 * Response Envelope
 * 
 * every success response is `{success: true, data, ...meta}` and every error is `{success: false, error: {...}}` so the clients will only need oe parser for all requests
 */

/**
 * @param {import('express').Response} res
 * @param {*} data
 * @param {number} [statusCode=200]
 * @param {object} [extra]     the extra is any other top level keys we want to add like {meta}
*/

function sendSuccess(res, data, statusCode = 200, extra={}){
    return res.status(statusCode).json({success: true, data, ...extra})
}

// Whenever a record is created
function sendCreated(res, data){
    return sendSuccess(res, data, 201)
}

// if there is an empty body
function sendNoContent(res){
    return res.status(204).send()
}

module.exports = {sendSuccess, sendCreated, sendNoContent}

// Remember this is to wrap the req in an "envelope" that we make and control so we can use 1 parser for everything ig