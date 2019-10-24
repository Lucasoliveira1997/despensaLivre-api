'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const condominiumSchema = new Schema({
    description: {type: String, required: true, unique: true, trim: true, index: true},
    condominiumType: {type: String, required: true, trim: true, index: true},
    cep: {type: String, required: true, trim: true, index: true},
    address: {type: String, required: true, trim: true, index: true},
    state: {type: String, required: true, trim: true, index: true},
    city: {type: String, required: true, trim: true, index: true},
    country: {type: String, required: true, trim: true, index: true},
    neighborhood: {type: String, required: true, trim: true, index: true},
    responsible: {type: String, trim: true, index: true},
    phone: {type: String, trim: true, index: true}
})

module.exports = mongoose.model('condominium', condominiumSchema)