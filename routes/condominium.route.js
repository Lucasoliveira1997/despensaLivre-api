'use strict'

const express = require('express')
const route = express.Router()
const _ctrl = require('../controllers/condominium.controller')

route.post('/', _ctrl.post)
route.put('/:id', _ctrl.put)
route.get('/', _ctrl.get)
route.get('/:id', _ctrl.getById)
route.delete('/:id', _ctrl.delete)

module.exports = route