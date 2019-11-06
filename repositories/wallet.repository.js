'use strict'

require('../models/wallet.model')
const repository = require('../bin/base/repository.base')
const mongoose = require('mongoose')

class walletRepository {

    constructor() {
        this._base = new repository('wallet')
    }

    async isMongooseValid(objectId) {       
        try {
            console.log('Veio no Try e deu Certo', error)
            return mongoose.Types.ObjectId.isValid(objectId)
        } catch (error) {
            console.log('Deu errinho mesmo isMongooseValid', error)            
        }
        
    }

    async isUserWalletExist(User) {
        try {
            console.log('Veio no Try e deu Certo', error)
            return await this._base._model.findOne({user: User})
        } catch (error) {
            console.log('Deu desastre mesmo isUserWalletExist', error)
        }
        
    }

    async isUserValid(Id) {     
        console.log('Chegou aqui')        
        return await this._base._model.findOne({id: Id})
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

module.exports = new walletRepository