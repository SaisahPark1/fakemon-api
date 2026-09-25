const { Router } = require('express')
const {create,findAll,findById,update,remove,getHealth} = require('../controllers/fakemonController.js')

const router = Router()

router.get('/health', getHealth)
router.get('/fakemon', findAll)
router.get('/fakemon/:id', findById)
router.post('/fakemon', create)
router.patch('/fakemon/:id', update)
router.delete('/fakemon/:id', remove)

module.exports = router