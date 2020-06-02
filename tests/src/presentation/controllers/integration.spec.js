const IntegrationController = require('../../../../src/presentation/controllers/integration')
const MissingParamError = require('../../../../src/presentation/errors/missingParamError')

const makeSut = () => {
  const sut = new IntegrationController()
  return sut
}
describe('IntegrationController', () => {
  test('Should return 400 if no apiKey is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new MissingParamError('apiKey'))
  })
})
