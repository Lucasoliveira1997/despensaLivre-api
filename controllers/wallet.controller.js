'use strict'

const repository = require('../repositories/wallet.repository')
const controllerBase = require('../bin/base/controller.base')
const validation = require('../bin/helpers/validation')

class walletController {
    constructor() {}

    async post(req, resp) {
        validation.clear()
        validation.isRequired(req.body.availableBalance, 'Informe o saldo da conta')
        validation.isRequired(req.body.user, 'Informe o usuário')
        validation.isNotObjectId(req.params.id, 'Usuário não encontrado')

        if(req.body.user) {
            let isUserWalletExist = await repository.isUserWalletExist(req.body.user) 
            validation.isTrue(isUserWalletExist, 'Um usuário pode ter apenas uma carteira') 
        }

        if(req.body.availableBalance) {
            validation.isTrue(req.body.availableBalance < 0, 'O saldo não pode ser negativo')
        }

        controllerBase.post(repository, validation, req, resp)        
    }

    async put(req, resp) {
        validation.clear()
        validation.isRequired(req.body.availableBalance, 'Informe o saldo da conta')
        validation.isRequired(req.body.user, 'Informe o usuário')
        validation.isNotObjectId(req.params.id, 'Usuário não encontrado')

        if(req.body.availableBalance) {
            validation.isTrue(req.body.availableBalance < 0, 'O saldo não pode ser negativo')
        }

        controllerBase.put(repository, validation, req, resp)
    }

    async get(req, resp) {
        return await controllerBase.get(repository, req, resp)
    }

    async getById(req, resp) {
        return await controllerBase.getById(repository, req, resp)
    }

    async delete(req, resp) {
        return await controllerBase.delete(repository, req, resp)
    }
}

module.exports = new walletController