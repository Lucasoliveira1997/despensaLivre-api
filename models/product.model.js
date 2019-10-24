'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {type: String, required: true, trim: true, index: true},
    picture: {type: String, required: true, trim: true, index: true},
    description: {type: String, required: true, trim: true, index: true},
    price: {type: Number, required: true, min: 0,trim: true, index: true}
})

module.exports = mongoose.model('product', productSchema)