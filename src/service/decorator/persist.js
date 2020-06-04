class PersistControllerDecorator {
  constructor (blingRequest, dealRepository) {
    this.blingRequest = blingRequest
    this.dealRepository = dealRepository
  }

  async post (data, apiKey) {
    await this.blingRequest.post(data, apiKey)
    await this.dealRepository.add(data)
    return true
  }
}
module.exports = PersistControllerDecorator
