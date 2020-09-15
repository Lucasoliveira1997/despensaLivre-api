'use strict'

const verifyValidation = require('../../middlewares/verifyValidation')

class controllerBase {
    constructor(){}

    async post(respository, validation, req, resp) {
        try {
            let retorno = await verifyValidation(validation, resp)
            if(retorno.statusCode === 400) return                                

            let result = await respository.create(req.body)
            resp.status(201).send({result})
        } catch (error) {
            console.log('erro no post', error)            
            resp.status(500).send({message: `erro no processamento: motivos`, erro: error})
        }
    }

    async put(respository, validation, req, resp) {
        try {
            let retorno = await verifyValidation(validation, resp)
            if(retorno.statusCode === 400) return
            
            let result = await respository.update(req.params.id, req.body)
            resp.status(202).send(result)

        } catch (error) {
            console.log('erro no post', error)    
            resp.status(500).send({message: `erro no processamento: motivos`, erro: error})
        }
    }

    async get(repository, req, resp) {
        try {
            let list = await repository.getAll()
            
            resp.status(200).send(list)
        } catch (error) {
            console.log('erro no get', error)    
            resp.status(500).send({message: `erro no processamento: motivos`, erro: error})
        }
    }

    async getById(repository, validation, req, resp) {
        try {
            let retorno = await verifyValidation(validation, resp)
            if(retorno.statusCode === 400) return

            if(req.params.id) {
                let result = await repository.getById(req.params.id)
                resp.status(200).send(result)
            } else {
                console.log('erro no getById', error)             
                resp.status(400).send({message: 'O Id precisa ser informado'}) 
            }
        } catch (error) {
            console.log('erro no getById', error)    
            resp.status(500).send({message: `erro no processamento: motivos`, erro: error})
        }
    }

    async delete(repository, validation, req, resp) {
        try {
            let retorno = await verifyValidation(validation, resp)
            if(retorno.statusCode === 400) return

            if(req.params.id) {
                let result = await repository.delete(req.params.id)
                resp.status(200).send({message: 'Registro excluído com sucesso'})
            } else {
                console.log('erro no delete', error) 
                resp.status(400).send('O Id precisa ser informado')
            }
        } catch (error) {
            console.log('erro no delete', error)    
            resp.status(500).send({message: `erro no processamento: motivos`, erro: error})
        }
    }
}

module.exports = new controllerBase