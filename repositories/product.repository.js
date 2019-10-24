'use strict'

require('../models/product.model')
const repository = require('../bin/base/repository.base')

class productRepository {

    constructor() {
        this._base = new repository('product')
    }

    async create(data) {
        let result = await this._base.create(data)
        return result
    }

    async update(id, data) {
        let result = await this._base.update(id, data)
        return result
    }

    async getAll() {
        return await this._base.getAll()
    }

    async getById(id) {
        return await this._base.getById(id)
    }

    async delete(id) {
        return await this._base.delete(id)
    }
}

module.exports = new productRepository