'use strict'

const {isConnected} = require('../config/database.js')
const {sendSuccess} = require('../utils/apiResponse.js')

function health(req, res){
    sendSuccess(res, {
        status: 'ok',
        database: isConnected() ? 'connected' : "disconnected",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    })
}
// NOT IN /api/v1 because it isn't part of the api itself

module.exports = {health}