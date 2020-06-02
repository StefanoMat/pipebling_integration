const axios = require('axios')
const PipeDriveRequest = require('../../../src/commands/pipeDriveRequest')

const makeSut = () => {
  const sut = new PipeDriveRequest()
  return sut
}
describe('PipeDrive Request', () => {
  test('Should throws if axios throws ', async () => {
    const sut = makeSut()
    jest.spyOn(axios, 'get').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.get('any_value')
    await expect(promise).rejects.toThrow()
  })
})
