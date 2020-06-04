const DealController = require('../../../../src/service/controllers/deals')

const makeDealRepository = () => {
  class DealRepository {
    async get () {
      return new Promise(resolve => resolve('data'))
    }
  }
  return new DealRepository()
}

const makeSut = () => {
  const dealRepositoryStub = makeDealRepository()
  const sut = new DealController(dealRepositoryStub)
  return {
    sut,
    dealRepositoryStub
  }
}

describe('Deals Controller', () => {
  test('Should returns 500 if DealRepository throws', async () => {
    const { sut, dealRepositoryStub } = makeSut()
    const httpRequest = {
      body: {}
    }
    jest.spyOn(dealRepositoryStub, 'get').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should calls DealRepository', async () => {
    const { sut, dealRepositoryStub } = makeSut()
    const httpRequest = {
      body: {}
    }
    const dealRepositoryStubSpy = jest.spyOn(dealRepositoryStub, 'get')
    await sut.handle(httpRequest)
    expect(dealRepositoryStubSpy).toHaveBeenCalled()
  })
})
