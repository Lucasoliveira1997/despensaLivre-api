'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId

const walletSchema = new Schema({
    availableBalance:  {type: String, required: true, trim: true, index: true},
})

const userSchema = new Schema({
    name: {type: String, required: true, trim: true, index: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    cpf: {type: String, required: true, unique: true, trim: true, index: true},
    condominium: {type: objectId, required: false, ref: 'condominium'},
    wallet: {type: [walletSchema], required: false, select: false, default: {availableBalance: 0}},
    profiles: {type: [String], required: false}
})

module.exports = mongoose.model('user', userSchema)