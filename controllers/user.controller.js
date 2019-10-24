'use strict'

const validation = require('../bin/helpers/validation')
const controllerBase = require('../bin/base/controller.base')
const repository = require('../repositories/user.repository')
const md5 = require('md5')

class userController {
    constructor(){}

    async post(req, resp) {
        validation.clear()
        validation.isRequired(req.body.name, 'Informe o Nome')
        validation.isRequired(req.body.email, 'Informe o Email')
        validation.isEmail(req.body.email, 'O email informado não é válido')
        validation.isRequired(req.body.password, 'Informe a senha')
        validation.isRequired(req.body.confirmedPassword, 'Confirme a senha')
        console.log(`original - ${req.body.password}`)
        console.log(`confirmação - ${req.body.confirmedPassword}`)                
        validation.isTrue(req.body.password != req.body.confirmedPassword, 'As senha informadas não são iguais')
        validation.isRequired(req.body.cpf, 'Infome o CPF')

        let IsUserEmailExist = await repository.isEmailExist(req.body.email)
        if (IsUserEmailExist) {
            validation.isTrue(IsUserEmailExist.name != undefined, `Já existe o email ${req.body.email} cadastrado!`)
        }

        let isUserCpfExist = await repository.isCpfExist(req.body.cpf)
        if (isUserCpfExist) {
            validation.isTrue(isUserCpfExist.name != undefined, `O cpf informado já está cadastrado!`)
        }

        if(req.body.password) {
            req.body.password = md5(req.body.password)   
        }

        controllerBase.post(repository, validation, req, resp)
    }

    async put(req, resp) {
        validation.clear()
        validation.isRequired(req.body.name, 'Informe o Nome')
        validation.isRequired(req.body.email, 'Informe o Email')
        validation.isEmail(req.body.email, 'O email informado não é válido')
        validation.isRequired(req.body.cpf, 'Infome o CPF')
        validation.isRequired(req.body.condominium, 'Informe o condominium')
        validation.isRequired(req.params.id, 'É neecssário informar um ID a ser atualizado')

        let IsUserEmailExist = await repository.isEmailExist(req.body.email)
        if (IsUserEmailExist) {
            validation.isTrue(
                (IsUserEmailExist.name != undefined) && 
                (IsUserEmailExist._id != req.params.id),
                `Já existe o email ${req.body.email} cadastrado!`)
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

module.exports = new userController