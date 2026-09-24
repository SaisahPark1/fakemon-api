const Fakemon = require('../models/fakemon')

async function create(data) {
    try{
        return Fakemon.create(data)
    } catch (error) {
        return {error: error.message}
    }
}

async function findAll() {
    try{
        return Fakemon.find()
    } catch (error) {
        return {error: error.message}
    }
}

async function findById(id) {
    try{
        return Fakemon.findById(id)
    } catch (error) {
        return {error: error.message}
    }
}

async function update(id, data) {
    try{
        return Fakemon.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        )
    } catch (error) {
        return {error: error.message}
    }
}

async function remove(id) {
    try{
        return Fakemon.findByIdAndDelete(id)
    } catch (error) {
        return {error: error.message}
    }
}

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
}