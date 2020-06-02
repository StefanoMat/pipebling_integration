const MissingParamError = require('../errors/missingParamError')

class IntegrationController {
  constructor (pipeDriveRequest, blingRequest) {
    this.pipeDriveRequest = pipeDriveRequest
    this.blingRequest = blingRequest
  }

  async handle (httpRequest) {
    try {
      const requiredFields = ['pipeDriveKey', 'blingKey']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return {
            statusCode: 400,
            body: new MissingParamError(field)
          }
        }
      }
      const dataPipeDrive = this.pipeDriveRequest.get(httpRequest.body.pipeDriveKey)
      const response = this.blingRequest.post(dataPipeDrive)
    } catch (err) {
      return {
        statusCode: 500,
        body: new Error(err)
      }
    }
  }
}
module.exports = IntegrationController
