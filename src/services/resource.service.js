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

async function serviceFindAll(user) {
    requireRole(user, ['admin', 'moderator', 'user'])

    return Fakemon.find()
}

async function serviceFindById(id, user) {
    requireRole(user, ['admin', 'moderator', 'user'])

    return Fakemon.findOne({
        id: Number(id)
    })
}

async function serviceEdit(id, data, user) {
    requireRole(user, ['admin', 'moderator'])

    return Fakemon.findOneAndUpdate(
        { id: Number(id) },
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
        { id: Number(id) },
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

    return Fakemon.findOneAndDelete({
        id: Number(id)
    })
}

module.exports = {
    serviceCreate,
    serviceFindAll,
    serviceFindById,
    serviceEdit,
    serviceRemove,
    serviceRecreate
}