const axios = require('axios')
const BlingRequest = require('../../../../src/infra/commands/blingRequest')

jest.mock('axios', () => ({
  async post () {
    return new Promise(resolve => resolve(true))
  }
}))

const makeSut = () => {
  const sut = new BlingRequest()
  return sut
}
describe('Bling Request', () => {
  test('Should throws if axios throws ', async () => {
    const sut = makeSut()
    jest.spyOn(axios, 'post').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.post('any_vale', 'any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if order is created ', async () => {
    const sut = makeSut()
    const promise = await sut.post({ data: 'data' }, 'valid_bling_key')
    expect(promise).toEqual(true)
  })
})
