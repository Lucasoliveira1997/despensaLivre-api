'use strict'

const express = require('express')
const router = express.Router()
const _ctrl = require('../controllers/wallet.controller')

router.post('/', _ctrl.post)
router.put('/:id', _ctrl.put)
router.get('/', _ctrl.get)
router.get('/:id', _ctrl.getById)
router.delete('/:id', _ctrl.delete)

module.exports = router
