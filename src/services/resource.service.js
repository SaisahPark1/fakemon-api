const Fakemon = require('../models/fakemon.model.js')

function requireRole(user, allowedRoles) {
    if (!user || !allowedRoles.includes(user.role)) {
        const error = new Error(
            'You do not have permission to perform this action'
        )

        error.status = 403
        throw error
    }
}

async function serviceCreate(data, user) {
    requireRole(user, ['admin', 'moderator'])

    return Fakemon.create(data)
}

async function serviceFindAll(page, limit, user) {
    requireRole(user, ['admin', 'moderator', 'user'])

    const skip = (page - 1) * limit
    const filter = {deletedAt: null}
    const data = await Fakemon.find(filter).skip(skip).limit(limit)
    const total = await Fakemon.countDocuments(filter)

    const totalPages = Math.ceil(total / limit)

    return {
        data,
        meta: {
            page,
            limit,
            total,
            totalPages
        }
    }
}

async function serviceFindById(id, user) {
    requireRole(user, ['admin', 'moderator', 'user'])

    return Fakemon.findOne({id: Number(id), deletedAt: null})
}

async function serviceEdit(id, data, user) {
    requireRole(user, ['admin', 'moderator'])

    return Fakemon.findOneAndUpdate(
        { id: Number(id), deletedAt: null },
        data,
        {
            returnDocument: 'after',
            runValidators: true
        }
    )
}

async function serviceRecreate(id, data, user) {
    requireRole(user, ['moderator'])

    return Fakemon.findOneAndReplace(
        { id: Number(id), deletedAt: null},
        {
            data,
            id: Number(id)
        },
        {
            returnDocument: 'after',
            runValidators: true
        }
    )
}

async function serviceRemove(id, user) {
    requireRole(user, ['admin'])

    return Fakemon.findOneAndUpdate(
        {
            id: Number(id),
            deletedAt: null
        },
        {
            deletedAt: new Date()
        },
        {
            new: true
        }
    )
}

module.exports = {
    serviceCreate,
    serviceFindAll,
    serviceFindById,
    serviceEdit,
    serviceRemove,
    serviceRecreate
}