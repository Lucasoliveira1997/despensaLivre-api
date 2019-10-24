'use strict'

const controllerBase = require('../bin/base/controller.base')
const repository = require('../repositories/advertisement.repository')
const validation = require('../bin/helpers/validation')

class advertisementController {
    constructor() {}

    async post(req, resp) {
        validation.clear()
        validation.isRequired(req.body.product, 'Informe o produto')
        validation.isRequired(req.body.quantity, 'Informe a quantidade')
        validation.isRequired(req.body.validity, 'Informe a validade')
        validation.isRequired(req.body.user, 'Informe o usuário que está fazendo a venda')
        validation.isRequired(req.body.unitPrice, 'Informe o preço unitário em R$')
        validation.isRequired(req.body.totalPrice, 'Informe o preço total')

        if(req.body.unitPrice || req.body.totalPrice) {
            validation.isTrue(req.body.unitPrice <= 0 || req.body.totalPrice <= 0, 'O preço não pode ser R4 0.00 ou negativo')
        }

        controllerBase.post(repository, validation, req, resp)
    }

    async put(req, resp) {
        validation.clear()
        validation.isRequired(req.body.product, 'Informe o produto')
        validation.isRequired(req.body.quantity, 'Informe a quantidade')
        validation.isRequired(req.body.validity, 'Informe a validade')
        validation.isRequired(req.body.user, 'Informe o usuário que está fazendo a venda')
        validation.isRequired(req.body.unitPrice, 'Informe o preço unitário em R$')
        validation.isRequired(req.body.totalPrice, 'Informe o preço total')

        if(req.body.unitPrice || req.body.totalPrice) {
            validation.isTrue(req.body.unitPrice <= 0 || req.body.totalPrice <= 0, 'O preço não pode ser R4 0.00 ou negativo')
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

module.exports = new advertisementController