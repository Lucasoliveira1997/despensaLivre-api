'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId

const userSchema = new Schema({
    name: {type: String, required: true, trim: true, index: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    cpf: {type: String, required: true, unique: true, trim: true, index: true},
    condominium: {type: objectId, required: false, ref: 'condominium'},
    profiles: {type: [String], required: false}
})

module.exports = mongoose.model('user', userSchema)