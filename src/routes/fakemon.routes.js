'use strict'

const express = require('express')
const fakemonController = require('../controllers/fakemon.controller')

const router = express.Router()

router
    .route('/')
        .get(fakemonController.getAllFakemon)
        .post(fakemonController.createFakemon)
router
    .route('/:id')
        .get(fakemonController.getOneFakemon)
        .put(fakemonController.updateFakemon)
        .patch(fakemonController.updateFakemon)
        .delete(fakemonController.removeFakemon)

// Here there will be more routes each with their own combination of get,put,patch,delete...etc

module.exports = router