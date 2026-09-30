const FakemonService = require('../services/resource.service.js')
const {PAGINATION} = require('../config/constants.js')

let nextId = 1

async function create(req, res) {
    try {
        const fakemon = await FakemonService.serviceCreate(
            {
                ...req.body,
                id: nextId++
            },
            req.user
        )

        return res.status(201).json(fakemon)

    } catch (error) {
        if (error.name === 'ValidationError'){
            return res.status(400).json({error: `You forgot something! ${error.message}`})
        } else {
            return res.status(error.status || 500).json({
                error: error.message
            })
        }
    }
}

async function findAll(req, res) {
    try {
        let limit
        const page = Number(req.query.page) || PAGINATION.DEFAULT_PAGE
        if(Number(req.query.limit)||0 < 1){
            limit = PAGINATION.DEFAULT_LIMIT
        } else if (Number(req.query.limit)||0 > PAGINATION.MAX_LIMIT){
            limit = PAGINATION.MAX_LIMIT
        } else {
            limit = Number(req.query.limit)
        }
        const fakemons = await FakemonService.serviceFindAll(
            page,
            limit,
            req.user
        )
        return res.status(200).json(fakemons)

    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.message
        })
    }
}

async function findById(req, res) {
    try {
        const fakemon = await FakemonService.serviceFindById(
            Number(req.params.id),
            req.user
        )

        if (!fakemon) {
            return res.status(404).json({
                error: 'Fakemon Not Found'
            })
        }

        return res.status(200).json(fakemon)

    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.message
        })
    }
}

async function edit(req, res) {
    try {
        const fakemon = await FakemonService.serviceEdit(
            Number(req.params.id),
            req.body,
            req.user
        )

        if (!fakemon) {
            return res.status(404).json({
                error: 'Fakemon Not Found'
            })
        }

        return res.status(200).json(fakemon)

    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.message
        })
    }
}

async function recreate(req, res) {
    try {
        const fakemon = await FakemonService.serviceRecreate(
            Number(req.params.id),
            req.body,
            req.user
        )

        if (!fakemon) {
            return res.status(404).json({
                error: 'Fakemon Not Found'
            })
        }

        return res.status(200).json(fakemon)

    } catch (error) {
        if (error.name === 'ValidationError'){
            return res.status(400).json({error: `You forgot something! ${error.message}`})
        } else {
            return res.status(error.status || 500).json({
                error: error.message
            })
        }
    }
}

async function remove(req, res) {
    try {
        const fakemon = await FakemonService.serviceRemove(
            Number(req.params.id),
            req.user
        )

        if (!fakemon) {
            return res.status(404).json({
                error: 'Fakemon Not Found'
            })
        }

        return res.status(204).send()

    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.message
        })
    }
}

async function getHealth(req, res) {
    return res.status(200).json({
        ok: true,
        uptime: Math.round(process.uptime())
    })
}

module.exports = {
    edit,
    findAll,
    findById,
    create,
    remove,
    getHealth,
    recreate
}