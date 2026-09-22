// We are pulling the connection logic for the database only and create functions for connecting and diconnecting from the db

const mongoose = require('mongoose')
const {mongoUri} = require('./env.js');
const { errorMonitor } = require('node:events');

// mongoose by default will always auto reconnect after a network outage or issue. If you're not using listeners or trackers you and your code will have no clue it happened and have no way to account for the loss in connection

let listenersAttached = false

function attachListeners(){
    if (listenersAttached) return;
    // making sure that if the function already runs to exit
    listenersAttached = true
    mongoose.connection.on('connected', () => {
        console.log(`MongoDB Connected: ${mongoose.connection.name}`)
    })
    mongoose.connection.on('error', () => {
        console.log(`MongoDB Error: ${errorMonitor.message}`)
    })
    mongoose.connection.on('disconnected', () => {
        console.log(`MongoDB Disconnected`)
    })
}

// above are essentially if statements for mongoose. that '.on' the detection of connected, error, or disconnected the following console.logs will be executed

// The next section is connecting to the db or exiting the process
// @param [string] [uri=mongoUri] overried the configured uri used by tests and scripts that target a different db

async function connectDatabase(uri = mongoUri){
    // This strips the query fields that aren't in the schema
    mongoose.set("strictQuery", true)
    attachListeners()

    try {
        await mongoose.connect(uri,{
            // The failure to connect in 10 seconds. To be fast and obvious
            serverSelectionTimeoutMS: 10000,
        })
    } catch (err) {
        console.log(`Could not connect to MongoDB: ${err.message}`)
        process.exit(1)
    }
}

async function disconnectDatabase(){
    await mongoose.connection.close()
}

function isConnected(){
    return mongoose.connection.readyState === 1
}

module.exports = {connectDatabase, disconnectDatabase, isConnected}