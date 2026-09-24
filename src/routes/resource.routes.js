const { Router } = require('express')
const {create,findAll,findById,update,remove} = require('../controllers/fakemonController.js')

const router = Router()

router.post('/', create)
router.get('/', findAll)
router.get('/:id', findById)
router.patch('/:id', update)
router.delete('/:id', remove)

module.exports = router