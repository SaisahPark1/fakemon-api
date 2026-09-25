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

module.exports = mongoose.model('Fakemon', fakemonSchema)