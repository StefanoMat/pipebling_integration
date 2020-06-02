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
const makeBlingRequest = () => {
  class BlingRequest {
    async post (value) {
      return new Promise(resolve => resolve('valid_apiKey'))
    }
  }
  return new BlingRequest()
}

const makeSut = () => {
  const pipeDriveRequestStub = makePipeDriveRequest()
  const blingRequestStub = makeBlingRequest()
  const sut = new IntegrationController(pipeDriveRequestStub, blingRequestStub)
  return {
    sut,
    pipeDriveRequestStub,
    blingRequestStub
  }
}
describe('IntegrationController', () => {
  test('Should return 400 if no pipeDriveKey is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        blingKey: 'api_key'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('pipeDriveKey'))
  })

  test('Should calls pipeDriveRequest with correct apiKey', async () => {
    const { sut, pipeDriveRequestStub } = makeSut()
    const httpRequest = {
      body: {
        pipeDriveKey: 'valid_apiKey',
        blingKey: 'valid_apiKey'
      }
    }
    const pipeDriveRequestSpy = jest.spyOn(pipeDriveRequestStub, 'get')
    await sut.handle(httpRequest)
    expect(pipeDriveRequestSpy).toHaveBeenCalledWith('valid_apiKey')
  })
})
