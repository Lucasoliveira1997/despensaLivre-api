'use strict'

const validation = require('../bin/helpers/validation')
const controllerBase = require('../bin/base/controller.base')
const repository = require('../repositories/condominium.repository')

class condominiumController {
    constructor(){}

    async post(req, resp) {
        validation.clear()
        validation.isRequired(req.body.description, "Informe uma descrição")
        validation.isRequired(req.body.condominiumType, "Informe o tipo de casa")
        validation.isRequired(req.body.cep, "Informe o cep")
        validation.isRequired(req.body.address, "Informe o endereço")
        validation.isRequired(req.body.state, "Informe o estado")
        validation.isRequired(req.body.city, "Informe a cidade")
        validation.isRequired(req.body.country, "Informe o País")
        validation.isRequired(req.body.neighborhood, "Informe o bairro")
        validation.isRequired(req.body.responsible, "Informe o responsável pelo condomínio")
        validation.isRequired(req.body.phone, "Informe um telefone")

        controllerBase.post(repository, validation, req, resp)
    }

    async put(req, resp) {
        validation.clear()      
        validation.isRequired(req.body.description, "Informe uma descrição")
        validation.isRequired(req.body.condominiumType, "Informe o tipo de casa")
        validation.isRequired(req.body.cep, "Informe o cep")
        validation.isRequired(req.body.address, "Informe o endereço")
        validation.isRequired(req.body.state, "Informe o estado")
        validation.isRequired(req.body.city, "Informe a cidade")
        validation.isRequired(req.body.country, "Informe o País")
        validation.isRequired(req.body.neighborhood, "Informe o bairro")
        validation.isRequired(req.body.responsible, "Informe o responsável pelo condomínio")
        validation.isRequired(req.body.phone, "Informe um telefone")
        validation.isNotObjectId(req.params.id, 'Condomínio não encontrado')

        controllerBase.put(repository, validation, req, resp)
    }

    async get(req, resp) {
        return await controllerBase.get(repository, req, resp)
    }

    async getById(req, resp) {
        validation.clear()            
        validation.isNotObjectId(req.params.id, 'Condomínio não encontrado')
        return await controllerBase.getById(repository, validation, req, resp)
    }

    async delete(req, resp) {
        validation.clear()            
        validation.isNotObjectId(req.params.id, 'Condomínio não encontrado')
        return await controllerBase.delete(repository, validation, req, resp)
    }
}

module.exports = new condominiumController