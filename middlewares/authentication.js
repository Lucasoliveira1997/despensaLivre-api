'use strict'

const jwt = require('jsonwebtoken')
const variables = require('../bin/configuration/variables')

module.exports = (req, resp, next) => {
    
    let token = req.body.token || req.query.query || req.headers['x-access-token']

    if(token) {
        try {            
            let decoded = jwt.verify(token, variables.Security.publicKey)
            req.body.userAuthenticated = decoded         
            next()

        } catch (error) {
            resp.status(401).send({message: 'Token inválido'})
        }
    } else {
        resp.status(403).send({message: 'Acesso Negado!'})
        return
    }
}