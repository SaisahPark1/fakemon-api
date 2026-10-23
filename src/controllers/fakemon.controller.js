'use strict'

const asyncHandler = require('../utils/asyncHandler')
const {sendSuccess, sendCreated, sendNoContent} = require('../utils/apiResponse')
const Fakemon = require('../models/fakemon.model')
const apiError = require('../utils/apiError')
const {parsePagination, parseSort, buildMeta, buildFakemonFilter} = require('../utils/queryFeatures.js')

const WRITABLE_FIELDS = ["name", 'types', 'image', 'description']
// DOESN'T INCLUDE dates, ownership variables, or ids

function pickWritableFields(body={}){
    const payload = {}
    for (const field of WRITABLE_FIELDS){
        if(body[field] !== undefined) payload[field] = body[field]
    }
    return payload
}

const getFakemonStats = asyncHandler(async(req, res)=>{
    const [total, grouped, all] = await Promise.all([
        Fakemon.countDocuments(),
        Fakemon.aggregate([{$group: {id: 'status', count: {$sum: 1}}}]),
        Fakemon.find({status: {$ne: PLANT_STATUS.RETIRED}})
    ])
    
    const byStatus = grouped.reduce((acc, row)=>({
        ...acc, [row.id]: row.count
    }), {})
    const overdue = all.filter((plant)=> plant.isOverdue).length()
    sendSuccess(res, {total,byStatus,overdue})
})

// GET /api/v1/fakemon
const getAllFakemon = asyncHandler(async(req, res)=>{
    /** Stage 1: pagination, features: sorting, filtering
     * 
     * each helper function should throw a 400 apiError on bad inputs and the asyncHandler forwards to the errorHandler so this handles all forms of error
      */
    const filter = buildFakemonFilter(req.query)
    const sort = parseSort(req.query.sort)
    const {page, limit, skip} = parsePagination(req.query)

    /**2 queries run together */
    const [fakemon, total] = await Promise.all([
        Fakemon.find(filter).sort(sort).skip(skip).limit(limit),
        Fakemon.countDocuments(filter)
    ])
    // The meta data will go along with the response
    sendSuccess(res, fakemon, 200, {meta: buildMeta({page, limit, total})})
})

// GET /api/v1/fakemon/:id
const getOneFakemon = asyncHandler(async(req, res)=>{
    const fakemon = await Fakemon.findById(req.params.id)
    if(!fakemon) throw apiError.notFound('Fakemon not Found')
    sendSuccess(res, fakemon)
})

// POST /api/v1/fakemon
const createFakemon = asyncHandler(async(req, res) => {
    // This is the line plant.model.js is looking for :)
    const fakemon = await Fakemon.create({
        ...pickWritableFields(req.body),
        ownerId: req.user.id
    })
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