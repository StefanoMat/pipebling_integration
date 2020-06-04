const IntegrationController = require('../../service/controllers/integration')
const PipeDriveRequest = require('../../infra/commands/pipeDriveRequest')
const BlingRequest = require('../../infra/commands/blingRequest')
const PersistDecorator = require('../../service/decorator/persist')
const DealRepository = require('../../infra/db/repository/dealRepository')

module.exports = {
  makeIntegrationController: function () {
    const blingRequest = new BlingRequest()
    const dealRepository = new DealRepository()
    const integrationController = new IntegrationController(new PipeDriveRequest(), new PersistDecorator(blingRequest, dealRepository))
    return integrationController
  }
}
