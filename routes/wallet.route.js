'use strict'

const express = require('express')
const router = express.Router()
const _ctrl = require('../controllers/wallet.controller')
const _auth = require('../middlewares/authentication')

router.post('/', _auth, _ctrl.post)
router.put('/:id', _auth,  _ctrl.put)
router.get('/', _auth,  _ctrl.get)
router.get('/:id', _auth,  _ctrl.getById)
router.delete('/:id', _auth,  _ctrl.delete)

module.exports = router
