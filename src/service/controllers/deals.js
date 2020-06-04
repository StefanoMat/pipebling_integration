class DealsController {
  constructor (dealRepository) {
    this.dealRepository = dealRepository
  }

  async handle (httpRequest) {
    try {
      const result = await this.dealRepository.get()
      return {
        statusCode: 200,
        body: result
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: new Error(err)
      }
    }
  }
}

module.exports = DealsController
