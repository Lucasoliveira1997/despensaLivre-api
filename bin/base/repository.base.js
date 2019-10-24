'use strict'

const mongoose = require('mongoose')

class repositoryBase {
    constructor(model) {
        this._model = mongoose.model(model)
    }

    async create(data) {
        let model = new this._model(data)
        let resultado = await model.save()
        return resultado
    }

    async update(id, data) {
        await this._model.findByIdAndUpdate(id, {$set: data})
        let userFound = this._model.findById(id)
        return userFound
    }

    async getAll() {
        let list = await this._model.find()
        return list
    }

    async getById(id) {
        let userFound = await this._model.findById(id)
        return userFound
    }

    async delete(id) {
        let userDeleted = await this._model.findByIdAndRemove(id)
        return userDeleted
    }
}

module.exports = repositoryBase