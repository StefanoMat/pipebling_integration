const express = require('express')
const routes = express()

const adapter = require('../adapter/expressRoute')
const integrationfactory = require('../factories/integration')
const dealsfactory = require('../factories/deals')

routes.post('/integration', adapter.adaptRoute(integrationfactory.makeIntegrationController()))
routes.get('/deals', adapter.adaptRoute(dealsfactory.makeDealsController()))

module.exports = routes
