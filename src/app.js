const express = require('express')
const mongoose = require('mongoose')

// Remember that the schema is the blue print for a record in the database and is used to validate new record data
const fakemonSchema = new mongoose.Schema({
    name: {type: String, required: true},
    id:{type: Number, required: true},
    types: {
        type: [String],
        required: true,
        validate: {
            validator: function (types) {
                return types.length >= 1 && types.length <= 2;
            },
            message: "A Fakemon must have one or two types."
        }
    },
    description:{type: String, required: true},
    image: {type: String, required: true},
    postedOn: {type: Date, default: new Date()},
    likes: {type: Number, default: 0},
    flags: {type: Number, default: 0}
},{timestamps: true})
// model for a fakemon
const Fakemon = mongoose.model("Fakemon", fakemonSchema)
// variable storing the model made from the fakemonSchema

const app = express()

app.use(express.json())


let nextId = 1
let linkPath = "/api/v1"

app.get(linkPath+'/health', (req, res)=> {
    res.status(200).json({status:'ok'})
})

// CRUD Responses: crud stands for Create, Read, Update, and Delete
app.get(linkPath+'/fakemon', async (req, res) => {
    try{
        const fakemon = await Fakemon.find({})
        // the async request uses mongoose's find function to return all records that use the fakemon model
        res.status(200).json(fakemon)
        // Responds with all the plans in the database in the form of a json
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
app.get(linkPath+"/fakemon/flagged", async (req, res) => {
    try{
        const flagged = await Fakemon.findAll({flagged: true})
        if (!fakemon.length){
            return res.status(404).json({error: 'No Flagged Fakemon Found'})
        }
        res.status(200).json(flagged)
    } catch (error) {
        res.status(500).json({error: "Encountered a Problem"})
    }
})
// READ: 200 or 404
app.get(linkPath+'/fakemon/:id', async (req, res) => {
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
})

// CREATE: 201
app.post(linkPath+'/fakemon', async (req, res) => {
    try{
        const fakemon = await Fakemon.create({id:String(nextId++), ...req.body})
        res.status(201).json(fakemon)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

// UPDATE: 200 or 404
app.patch(linkPath+'/fakemon/:id', async (req,res)=>{
    try{
        const fakemon = await Fakemon.findOneAndUpdate({id:Number(req.params.id)}, req.body)
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
})

// DELETE: 204 or 404
app.delete(linkPath+'/fakemon/:id', async (req,res)=>{
    try{
        // if there is no fakemon of the id
        const fakemon = await Fakemon.findOneAndDelete({id:Number(req.params.id)})
        if (!fakemon) return res.status(404).json({error: "It already doesn't exist bro"})
        // remove the record from the database
        res.status(204).send()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = app