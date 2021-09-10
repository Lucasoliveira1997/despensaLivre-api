'use strict'

const variables = {
    api: {
        port: process.env.port || 3003
    },

    database: {
        // connection: process.env.connection || 'mongodb://despensalivre:RBvqSwXZY5BcNZ39@cluster0-shard-00-00-ffuac.mongodb.net:27017,cluster0-shard-00-01-ffuac.mongodb.net:27017,cluster0-shard-00-02-ffuac.mongodb.net:27017/despensalivretest?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
        connection: {
            url: 'mongodb://localhost:27017/despensalivre',
        },
        options: {
            useNewUrlParser: true,
            // useUnifiedTopology: true
        }
    },

    Security: {
        publicKey: '434735bf4efe7975dc81edac37b0bbc8|d3627aa74146d459446df5113d3c82ab'
    }
}

module.exports = variables