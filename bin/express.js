'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const variables = require('./configuration/variables')

//importação das rotas
const userRoute = require('../routes/user.route')
const condominiumRoute = require('../routes/condominium.route')
const productRoute = require('../routes/product.route')
const advertisementRoute = require('../routes/advertisement.route')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

console.log(typeof variables.database.options);

mongoose.connect('mongodb://despensalivre:RBvqSwXZY5BcNZ39@cluster0-shard-00-00-ffuac.mongodb.net:27017,cluster0-shard-00-01-ffuac.mongodb.net:27017,cluster0-shard-00-02-ffuac.mongodb.net:27017/despensalivretest?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true })


mongoose.set('useCreateIndex', true)
    mongoose.connection.on('connected', () => console.log('Database Connected'))
    mongoose.connection.on('disconnected', () => console.log('Database Disconnected'))
    mongoose.connection.on('error', () => console.log('Database connection Failed'))


app.use('/api/users', userRoute)
app.use('/api/condominiums', condominiumRoute)
app.use('/api/products', productRoute)
app.use('/api/advertisements', advertisementRoute)

module.exports = app