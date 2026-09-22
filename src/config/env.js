require('dotenv').config()

const REQUIRED = ['NODE_ENV', 'PORT', 'MONGODB_URI']
const missing = REQUIRED.filter((key) => !process.env[key])
// Built aboce is a set of rules to check and report required ENV variables and what is missing

if (missing.length > 0){
    console.log(`Missing required enviornment variable(s): ${missing.join(', ')}`)
    process.exit(1)
}

module.exports = {
    nodeEnv: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    mongoUri: process.env.MONGODB_URI,
    isProduction: process.env.NODE_ENV === "productions"
}
// exported variables can and should be used through the project and should serve as a central hub if anything needs to be added to or changed