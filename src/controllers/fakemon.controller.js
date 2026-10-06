'use strict'

const asyncHandler = require('../utils/asyncHandler')
const {sendSuccess, sendCreated, sendNoContent} = require('../utils/apiResponse')
const Fakemon = require('../models/fakemon.model')
const apiError = require('../utils/apiError')


// GET /api/v1/
const getAllFakemon = asyncHandler(async(req, res)=>{
    try{
        const fakemon = await Fakemon.find({})
        res.status(200).json({success:true, data:fakemon})
    } catch (error) {
        res.status(500).json({success:false, error:error})
    }
})

// GET /api/v1/fakemons/:id
const getOneFakemon = asyncHandler(async(req, res)=>{
    const fakemon = await Fakemon.findById(req.params.id)
    if(!fakemon) throw apiError.notFound('Fakemon not Found')
    sendSuccess(res, fakemon)
})

// POST /api/v1/fakemons
const createFakemon = asyncHandler(async(req, res) => {
    const fakemon = await Fakemon.create(req.body)
    sendCreated(res,fakemon)
})

// PUT+PATCH /api/v1/fakemons/:id
const updateFakemon = asyncHandler(async(req, res) => {
    const fakemon = await Fakemon.findByIdAndUpdate(req.params.id, req.body, {
        new:true, runValidators: true
    })
    if (!fakemon) throw apiError.notFound('Fakemon not Found')
    sendSuccess(res, fakemon)
})

// DELETE /api/v1/fakemons/:id
const removeFakemon = asyncHandler(async(req, res) => {
    const fakemon = await Fakemon.findByIdAndDelete(req.params.id)
    if (!fakemon) throw apiError.notFound('Fakemon not Found')
    sendNoContent(res)
})

module.exports = {getAllFakemon, getOneFakemon, createFakemon, removeFakemon, updateFakemon}