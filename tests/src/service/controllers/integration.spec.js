const IntegrationController = require('../../../../src/service/controllers/integration')
const MissingParamError = require('../../../../src/service/errors/missingParamError')

const makePipeDriveRequest = () => {
  class PipeDriveRequest {
    async get (value) {
      return new Promise(resolve => resolve('valid_apiKey'))
    }
  }
  return new PipeDriveRequest()
}

const makeSut = () => {
  const pipeDriveRequestStub = makePipeDriveRequest()
  const sut = new IntegrationController(pipeDriveRequestStub)
  return {
    sut,
    pipeDriveRequestStub
  }
}
describe('IntegrationController', () => {
  test('Should return 400 if no apiKey is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('apiKey'))
  })

  test('Should calls pipeDriveRequest with correct apiKey', async () => {
    const { sut, pipeDriveRequestStub } = makeSut()
    const httpRequest = {
      body: {
        apiKey: 'valid_apiKey'
      }
    }
    const pipeDriveRequestSpy = jest.spyOn(pipeDriveRequestStub, 'get')
    await sut.handle(httpRequest)
    expect(pipeDriveRequestSpy).toHaveBeenCalledWith('valid_apiKey')
  })
})
