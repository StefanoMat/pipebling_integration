const axios = require('axios')
const PipeDriveRequest = require('../../../../src/infra/commands/pipeDriveRequest')

jest.mock('axios', () => ({
  async get () {
    return { data: new Promise(resolve => resolve(true)) }
  }
}))

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

  test('Should return true if request success', async () => {
    const sut = makeSut()
    const promise = await sut.get('valid_pipedrive_key')
    expect(promise).toEqual(true)
  })
})
