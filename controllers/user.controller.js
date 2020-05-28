'use strict'

const validation = require('../bin/helpers/validation')
const controllerBase = require('../bin/base/controller.base')
const repository = require('../repositories/user.repository')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const variables = require('../bin/configuration/variables')

class userController {
    constructor(){}

    async authenticate(req, resp) {
        validation.clear()
        validation.isRequired(req.body.email, 'Informe seu email')
        validation.isEmail(req.body.email, 'Endereço de email inválido')
        validation.isRequired(req.body.password, 'Informe sua senha')

        if(!validation.isValid()){
            resp.status(400).send({validation: validation.errors()})            
            return
        }

        let userAuthorized = await repository.authenticate(req.body.email, req.body.password)
        if(userAuthorized) {
            resp.status(200).send({
                user: userAuthorized,
                token: jwt.sign({user: userAuthorized}, variables.Security.publicKey)
            })
        } else {
            resp.status(400).send({message: "Usuário e senha incorretos!"})
        }
    }

    async post(req, resp) {
        validation.clear()
        validation.isRequired(req.body.name, 'Informe o Nome')
        validation.isRequired(req.body.email, 'Informe o Email')
        validation.isEmail(req.body.email, 'O email informado não é válido')
        validation.isRequired(req.body.password, 'Informe a senha')
        validation.isRequired(req.body.confirmedPassword, 'Confirme a senha')              
        validation.isTrue(req.body.password != req.body.confirmedPassword, 'As senha informadas não são iguais')
        validation.isRequired(req.body.cpf, 'Infome o CPF')
        validation.isCpf(req.body.cpf, 'CPF inválido')

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
        validation.isCpf(req.body.cpf, 'CPF inválido')
        validation.isRequired(req.body.condominium, 'Informe o condominium')
        validation.isRequired(req.params.id, 'É necessário informar um ID a ser atualizado')

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