'use strict'

const repository = require('../repositories/product.repository')
const controllerBase = require('../bin/base/controller.base')
const validation = require('../bin/helpers/validation')

class productController {
    constructor() {}

    async post(req, resp) {
        validation.clear()
        validation.isRequired(req.body.name, 'Informe o nome do produto')
        validation.isRequired(req.body.picture, 'A foto do produto é obrigatória')
        validation.isRequired(req.body.description, 'Dê uma descrição do produto')
        validation.isRequired(req.body.price, 'Informe o preço do produto')

        if(req.body.price) {
            validation.isTrue(req.body.price <= 0, 'O preço não pode ser R$ 0,00 ou negativo')
        }

        controllerBase.post(repository, validation, req, resp)
    }

    async put(req, resp) {
        validation.clear()
        validation.isRequired(req.body.name, 'Informe o nome do produto')
        validation.isRequired(req.body.picture, 'A foto do produto é obrigatória')
        validation.isRequired(req.body.description, 'Dê uma descrição do produto')
        validation.isRequired(req.body.price, 'Informe o preço do produto')

        if(req.body.price) {
            validation.isTrue(req.body.price <= 0, 'O preço não pode ser R$ 0,00 ou negativo')
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

module.exports = new productController
