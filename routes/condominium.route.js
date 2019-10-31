'use strict'

const express = require('express')
const route = express.Router()
const _ctrl = require('../controllers/condominium.controller')
const _auth = require('../middlewares/authentication')

route.post('/', _auth,  _ctrl.post)
route.put('/:id', _auth,  _ctrl.put)
route.get('/', _auth,  _ctrl.get)
route.get('/:id', _auth,  _ctrl.getById)
route.delete('/:id', _auth,  _ctrl.delete)

module.exports = route