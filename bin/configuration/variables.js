'use strict'

const variables = {
    api: {
        port: process.env.port || 3003
    },

    database: {
        connection: process.env.connection || 'mongodb://localhost:27017/despensa-livre-api',
        options: {
            reconnectTries: Number.MAX_VALUE, 
            reconnectInterval: 500, poolSize: 5, 
            useNewUrlParser: true, 
            useUnifiedTopology: true        
        }
    },

    Security: {
        publicKey: '434735bf4efe7975dc81edac37b0bbc8|d3627aa74146d459446df5113d3c82ab'
    }
}

module.exports = variables