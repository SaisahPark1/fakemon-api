const Fakemon = require('../models/fakemon.model.js')

nextId = 1

async function create(req, res){
    try{
        const fakemon = await Fakemon.create({...req.body, id:String(nextId++)})
        res.status(201).json(fakemon)
    } catch (error){
        if (error.name === 'ValidationError') {
            res.status(400).json({error: `You forgot something! ${error.message}`});
        } else {
            res.status(500).json({error: error.message});
        }
    }
}

async function findAll(req, res){
    try{
        const fakemon = await Fakemon.find({})
        // the async request uses mongoose's find function to return all records that use the fakemon model
        res.status(200).json(fakemon)
        // Responds with all the plans in the database in the form of a json
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function findById(req, res){
    // requires a parameter that is in the URL segment, via :id
    try {
        const {record_id} = req.params.id
        const fakemon = await Fakemon.find({id: Number(req.params.id)})
        // uses id parameter to search the database for the match!
        if (!fakemon.length){
            return res.status(404).json({error: 'Fakemon Not Found'})
            // If the conditional fails
        }
        res.status(200).json(fakemon)
        // If the condition succeeds :)
    } catch (error) {
        res.status(500).json({error: "Can't get /fakemon/"+req.params.id})
    }
}

async function update(req, res){
    try{
        const fakemon = await Fakemon.findOneAndUpdate({id:Number(req.params.id)}, req.body, {new: true, runValidators: true})
        // find the specific fakemon record
        if(!fakemon) return res.status(404).json({error: "Fakemon Not Found"})
        // If there is none with the id
        // Object.assign(fakemon, req.body)
        // update the fakemon's data!
        // with the mindset that all the data fills the requirements! (will need a schema)
        res.status(200).json(fakemon)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function remove(req, res){
    try{
        // if there is no fakemon of the id
        const fakemon = await Fakemon.findOneAndDelete({id:Number(req.params.id)})
        if (!fakemon) return res.status(404).json({error: "It already doesn't exist bro"})
        // remove the record from the database
        res.status(204).send()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function getHealth(req, res){
    try{
        res.status(200).json({ok:true, uptime: Math.round(process.uptime())})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {update, findAll, findById, create, remove, getHealth}