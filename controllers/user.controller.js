'use strict'

const validation = require('../bin/helpers/validation')
const controllerBase = require('../bin/base/controller.base')
const repository = require('../repositories/user.repository')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const variables = require('../bin/configuration/variables')
const verifyValidation = require('../middlewares/verifyValidation')

class userController {
    constructor() { }

    async authenticate(req, resp) {
        validation.clear()
        validation.isRequired(req.body.cpf || req.body.email, 'Informe seu Email ou Cpf')
        validation.isRequired(req.body.password, 'Informe sua senha')
        let hashPassword = md5(req.body.password)
        let login = {}

        if (req.body.cpf) {
            validation.isCpf(req.body.cpf, 'Cpf inválido')
            login = { cpf: req.body.cpf, password: hashPassword }
        }
        if (req.body.email) {
            validation.isEmail(req.body.email, 'Email Inválido')
            login = { email: req.body.email, password: hashPassword }
        }

        let retorno = await verifyValidation(validation, resp)
        if (retorno.statusCode === 400) return

        let userAuthorized = await repository.authenticate(login)
        if (userAuthorized) {
            resp.status(200).send({
                user: userAuthorized,
                token: jwt.sign({ user: userAuthorized }, variables.Security.publicKey)
            })
        } else {
            resp.status(400).send({ message: "Usuário e senha incorretos!" })
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

        if (req.body.password) {
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
        validation.isNotObjectId(req.params.id, 'Usuário não encontrado')

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
        // const items = list.map(item => {
        //     return Object.assign({_links: {wallet: 'wallet link'}}, item.toJSON())
        // })

        return await controllerBase.get(repository, req, resp)
    }

    async getById(req, resp) {
        validation.clear()            
        validation.isNotObjectId(req.params.id, 'Usuário não encontrado')
        return await controllerBase.getById(repository, validation, req, resp)
    }

    async getWallet(req, resp) {
        validation.clear()            
        validation.isNotObjectId(req.params.id, 'Carteira não encontrada')

        try {
            let retorno = await verifyValidation(validation, resp)
            if (retorno.statusCode === 400) return

            let wallet = await repository.getWallet(req.params.id)
            resp.status(200).send(wallet)            
        } catch (error) {
            console.log('erro no getWallet', error)      
            resp.status(500).send({message: `erro no processamento: motivos`, erro: error})      
        }

    }

    async putWallet(req, resp) {
        validation.clear()            
        validation.isTrue(req.body.availableBalance <= 0, 'Valor informado inválido')
        validation.isNotObjectId(req.params.id, 'Carteira não encontrada')

        try {
            let retorno = await verifyValidation(validation, resp)
            if (retorno.statusCode === 400) return

            let result = await repository._base.update(req.params.id, req.body)
            resp.status(202).send(result)
        } catch(error) {
            console.log('erro no putWallet', error)
            resp.status(500).send({message: `erro no processamento: motivos`, erro: error})
        }
    }

    async delete(req, resp) {
        validation.clear()            
        validation.isNotObjectId(req.params.id, 'Usuário não encontrado')
        return await controllerBase.delete(repository, validation, req, resp)
    }
}

module.exports = new userController