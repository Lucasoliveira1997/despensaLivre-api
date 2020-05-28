'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const variables = require('./configuration/variables')

//importação das rotas
const userRoute = require('../routes/user.route')
const condominiumRoute = require('../routes/condominium.route')
const productRoute = require('../routes/product.route')
const walletRoute = require('../routes/wallet.route')
const advertisementRoute = require('../routes/advertisement.route')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

mongoose.connect(variables.database.connection, variables.database.options)
mongoose.set('useCreateIndex', true)
    mongoose.connection.on('connected', () => console.log('Database Connected'))
    mongoose.connection.on('disconnected', () => console.log('Database Disconnected'))
    mongoose.connection.on('error', () => console.log('Database connection Failed'))


app.use('/api/users', userRoute)
app.use('/api/condominiums', condominiumRoute)
app.use('/api/products', productRoute)
app.use('/api/wallets', walletRoute)
app.use('/api/advertisements', advertisementRoute)

module.exports = app