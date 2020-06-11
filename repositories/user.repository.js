'use strict'

require('../models/user.model')
const repository = require('../bin/base/repository.base')

class userRepository {
    constructor() {
        this._base = new repository('user')
    }

    async authenticate(Login) {        
        return await this._base._model.findOne(Login)      
    }

    async isEmailExist(Email) {
        return await this._base._model.findOne({email: Email})
    }

    async isCpfExist(Cpf) {
        return await this._base._model.findOne({cpf: Cpf})
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

module.exports = new userRepository