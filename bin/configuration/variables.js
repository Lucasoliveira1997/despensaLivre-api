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
    }
}

module.exports = variables