'use strict'

const { query } = require('../app.js')
/**This will serve as a platform for helper functions in pagination, sorting, filtering, and error handling 
 * 
 * Pagination!
 * 
 * For sizability and filtering time.
 * 
 * @param {object} query req.query
 * @param {{page:number, limit:number, skip:number}}
*/

const {PAGINATION, SORTABLE_FIELDS, DEFAULT_SORT, TYPES} = require('../config/constants.js')
const apiError = require('../utils/apiError.js')

function parsePagination(query={}){
    const rawPage = Number.parseInt(query.page, 10)
    const rawLimit = Number.parseInt(query.limit, 10)
    // request limitations
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage: PAGINATION.DEFAULT_PAGE

    let limit = Number.isInteger(rawLimit) && rawLimit > 0 ? rawLimit : PAGINATION.DEFAULT_LIMIT

    if (limit > PAGINATION.MAX_LIMIT) limit = PAGINATION.MAX_LIMIT
    // skip is how many documents the database skips over before starting
    return {page, limit, skip: (page-1)*limit} 
}
/** We are turning on sorting with the following function by also creating a whitelist!
 * 
 * REMINDER: - means descending, + means ascending when sorting
 * 
 * @param {string} [sortParam] req.query.sort
 * @returns {object} a Mongoose sort object
 * @throws {apiError} 400 when a field is not sortable
 */

function parseSort(sortParam){
    if(!sortParam || typeof sortParam !== 'string') return {...DEFAULT_SORT}

    const sort = {}

    for(const rawField of sortParam.split(',')){
        const field = rawField.trim()
        if (!field) continue
        const descending = field.startsWith('-')
        const name = descending ? field.slice(1) : field
    }

    if (!SORTABLE_FIELDS.includes(name)){
        throw apiError.badRequest(`Cannot sort by '${name}' Sortable Fields: ${SORTABLE_FIELDS.join(', ')}`)
    }
    // Checks to see the field name given is allowed
    sort['name'] = descending ? -1: 1

    return Object.keys(sort).length > 0 ? sort : {...DEFAULT_SORT}
}

/**
 * meta gives us data about the page and stuff like {success, data, meta}
 * 
 * @param {{page: number, limit: number, total: number}} args
 */

function buildMeta({page, limit, total}){
    const totalPages = limit > 0 ? Math.ceil(total/limit) : 0

    return{
        page, limit, total, totalPages, 
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
    }
}
/** 
 * Escape a users search from becoming a liability
 * 
 * Without the following function, the search for "c++" or "(" would either crash the regex or other bad stuff
 * Bad people DDOS you with purposefully bad regex things or idk
 */

function escapeRegex(text){
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * lastly for stage 2 we are going to build a plany filter function.
 * this will live in the file, next to the query helpers so the controller is not super overwhelmed
 * 
 * Do NOT include ?overDue = true or similar
 * 
 * @param {object} query req.query
 * @returns {object} a filter object for Plant.find()
 * @throws {apiError}
 */

function buildFakemonFilter(query={}){
    const filter = {}
    if(query.name){
        filter.name = query.name
    }
    if (query.q){
        // 'i' is for case insensitive
        const pattern = new RegExp(escapeRegex(String(query.q).trim()), 'i')
        filter.$or = [{nickname: pattern}, {species: pattern}]
    }
    return filter
}

module.exports = {parsePagination, parseSort, buildMeta, buildFakemonFilter, escapeRegex}