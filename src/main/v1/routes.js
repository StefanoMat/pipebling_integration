const express = require('express')
const routes = express()

const adapter = require('../adapter/expressRoute')
const factory = require('../factories/integration')
routes.post('/integration', adapter.adaptRoute(factory.makeIntegrationController()))

module.exports = routes
