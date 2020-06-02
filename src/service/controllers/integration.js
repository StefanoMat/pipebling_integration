const MissingParamError = require('../errors/missingParamError')

class IntegrationController {
  async handle (httpRequest) {
    const requireField = 'apiKey'
    if (!httpRequest.body[requireField]) {
      return {
        statusCode: 400,
        body: new MissingParamError(requireField)
      }
    }
  }
}
module.exports = IntegrationController
