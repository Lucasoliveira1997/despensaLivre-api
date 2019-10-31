'use strict'

const express = require('express')
const router = express.Router()
const _ctrl = require('../controllers/user.controller')
const _auth = require('../middlewares/authentication')

router.post('/', _ctrl.post)
router.post('/auth', _ctrl.authenticate)

router.put('/:id', _auth,  _ctrl.put)
router.get('/', _auth,  _ctrl.get)
router.get('/:id', _auth,  _ctrl.getById)
router.delete('/:id', _auth,  _ctrl.delete)

module.exports = router