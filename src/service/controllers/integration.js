const MissingParamError = require('../errors/missingParamError')

class IntegrationController {
  constructor (pipeDriveRequest) {
    this.pipeDriveRequest = pipeDriveRequest
  }

  async handle (httpRequest) {
    const requireField = 'apiKey'
    if (!httpRequest.body[requireField]) {
      return {
        statusCode: 400,
        body: new MissingParamError(requireField)
      }
    }

    const dataPipeDrive = this.pipeDriveRequest.get(httpRequest.body.apiKey)
  }
}
module.exports = IntegrationController
