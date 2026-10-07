'use strict'

const asyncHandler = require('../utils/asyncHandler')
const {sendSuccess, sendCreated, sendNoContent} = require('../utils/apiResponse')
const Fakemon = require('../models/fakemon.model')
const apiError = require('../utils/apiError')
const {PAGINATION} = require('../config/constants')


const getAllFakemon = asyncHandler(async(req, res)=>{
    try{
        const page = Math.max(parseInt(req.query.page) || 1, 1)
        const limit = Math.min(Math.max(parseInt(req.query.limit) || PAGINATION.DEFAULT_LIMIT, 1), PAGINATION.MAX_LIMIT)
        const skip = (page - 1) * limit

        const [data, total] = await Promise.all([
            Fakemon.find().sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit),
            Fakemon.countDocuments()
        ])

        sendSuccess(res, data)
    } catch (error) {
        res.status(500).json({success:false, error:error})
    }
})

// GET /api/v1/fakemon/:id
const getOneFakemon = asyncHandler(async(req, res)=>{
    const fakemon = await Fakemon.findById(req.params.id)
    if(!fakemon) throw apiError.notFound('Fakemon not Found')
    sendSuccess(res, fakemon)
})

// POST /api/v1/fakemon
const createFakemon = asyncHandler(async(req, res) => {
    const fakemon = await Fakemon.create(req.body)
    sendCreated(res,fakemon)
})

// PUT+PATCH /api/v1/fakemon/:id
const updateFakemon = asyncHandler(async(req, res) => {
    const fakemon = await Fakemon.findByIdAndUpdate(req.params.id, req.body, {
        new:true, runValidators: true
    })
    if (!fakemon) throw apiError.notFound('Fakemon not Found')
    sendSuccess(res, fakemon)
})

// DELETE /api/v1/fakemon/:id
const removeFakemon = asyncHandler(async(req, res) => {
    const fakemon = await Fakemon.findByIdAndDelete(req.params.id)
    if (!fakemon) throw apiError.notFound('Fakemon not Found')
    sendNoContent(res)
})

module.exports = {getAllFakemon, getOneFakemon, createFakemon, removeFakemon, updateFakemon}