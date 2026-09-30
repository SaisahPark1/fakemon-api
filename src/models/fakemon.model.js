const mongoose = require('mongoose')
const {TYPES} = require('../config/constants.js')
// Remember that the schema is the blue print for a record in the database and is used to validate new record data
const fakemonSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'MUST HAVE A NAME'], minlength: [1, "Name must be at least one character long"], maxlength: [25, "Name can't be more than 25 characters"]},
    id:{type: Number, required: true},
    types: {
        type: [{
            type: String,
            enum: {
                values: TYPES,
                message: '{VALUE} is not a supported Fakemon type'
            }
        }],
        validate: {
            validator: types =>
            types.length >= 1 && types.length <= 2 &&
            new Set(types).size === types.length,
            message: 'A Fakemon must have one or two types.'
        }
    },
    description:{type: String, required: true, minlength: 1, maxlength: 250},
    image: {type: String, required: true},
    postedOn: {type: Date, default: new Date()},
    likes: {type: Number, default: 0},
    flags: {type: Number, default: 0},
    deletedAt: {type: Date, default: null},
    owner: {type: String, default: "Not Implemented"}
},{timestamps: true})

module.exports = mongoose.model('Fakemon', fakemonSchema)