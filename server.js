'use strict'

const app = require('./bin/express')
const variables = require('./bin/configuration/variables')

app.listen(variables.api.port, () => console.log(`Server is running on port ${variables.api.port}`))