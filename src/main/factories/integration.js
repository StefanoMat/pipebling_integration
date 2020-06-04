const IntegrationController = require('../../service/controllers/integration')
const PipeDriveRequest = require('../../infra/commands/pipeDriveRequest')
const BlingRequest = require('../../infra/commands/blingRequest')

module.exports = {
  makeIntegrationController: function () {
    const integrationController = new IntegrationController(new PipeDriveRequest(), new BlingRequest())
    return integrationController
  }
}
