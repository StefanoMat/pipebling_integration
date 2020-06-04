const MongoHelper = require('../helpers/mongoHelper')

class DealRepository {
  async add (dealModels) {
    const dealCollection = await MongoHelper.getCollection('deals')
    const result = await dealCollection.insertMany(dealModels)
    return result.ops
  }
}
module.exports = DealRepository
