const http = require('http')
const PipeDriveRequest = require('../../../src/commands/pipeDriveRequest')

const makeSut = () => {
  const sut = new PipeDriveRequest()
  return sut
}
describe('PipeDrive Request', async () => {
  test('Should throws if http throws', async () => {
    const sut = makeSut()
    jest.spyOn(http, 'get').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.get('any_value')
    await expect(promise).rejects.toThrow()
  })
})
