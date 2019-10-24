'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId

const walletSchema = new Schema({
    availableBalance:  {type: String, required: true, trim: true, index: true},
    user: {type: objectId, required: true, ref: 'user', unique: true, trim: true, index: true}
})

module.exports = mongoose.model('wallet', walletSchema)