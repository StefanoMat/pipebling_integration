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
      const dataPipeDrive = await this.pipeDriveRequest.get(httpRequest.body.pipeDriveKey)
      try {
        await this.blingRequest.post(dataPipeDrive, httpRequest.body.blingKey)
      } catch (err) {
        console.log(err)
        return {
          statusCode: 401,
          body: new Error(JSON.stringify(err.response.data))
        }
      }
      return {
        statusCode: 200,
        body: 'Integração concluída com sucesso!'
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: new Error(err)
      }
    }
  }
}
module.exports = IntegrationController
