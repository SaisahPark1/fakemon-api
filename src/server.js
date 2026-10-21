const {connectDatabase, disconnectDatabase} = require('./config/database.js')
const {port} = require('./config/env.js')
const app = require('./app.js')
const {API_PREFIX} = require('./config/constants.js')

async function start(){
    await connectDatabase()
    const server = app.listen(port,()=> console.log(`Listening on port:${port}`))
}

/**
 * Stop will mean stop new connections let the running requests finish then close
 * Otherwise, every request in progress will fail
 */

const shutdown = (signal)=>{
    console.log(`\n${signal} recieved, shuttingdown`)

    const force = setTimeout(() => {
        console.error("FORCING EXIT AFTER 10s")
        process.exit(1)
    },10000)
    force.unref()

    server.close(async()=>{
        await disconnectDatabase()
        console.log("Shutdown Complete")
        process.exit(0)
    })

    process.on('SIGTERM', ()=> shutdown("SIGTERM"))
    process.on('SIGINT', ()=> shutdown("SIGINT"))
    // Significant Term and Significant Integer or Number
}

start()