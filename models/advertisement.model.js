'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId

const advertisementSchema = new Schema({
    product: {type: String, required: true, trim: true, index: true},
    advertisementDate: {type: Date, default: Date.now, required: true, trim: true, index: true},    
    quantity: {type: Number, required: true, trim: true, index: true},    
    validity: {type: Date, required: true, trim: true, index: true},
    user: {type: objectId, required: true, ref: 'user', trim: true, index: true},
    unitPrice: {type: String, require: true, trim: true, index: true},
    totalPrice: {type: String, required: true, trim: true, index: true}
})

module.exports = mongoose.model('advertisement', advertisementSchema)