const { Router } = require('express')
const {create,findAll,findById,edit,remove,getHealth,recreate} = require('../controllers/fakemonController.js')

const router = Router()

router.get('/health', getHealth)
router.get('/fakemon', findAll)
router.get('/fakemon/:id', findById)
router.post('/fakemon', create)
router.put('/fakemon/:id', recreate)
router.patch('/fakemon/:id', edit)
router.delete('/fakemon/:id', remove)

module.exports = router