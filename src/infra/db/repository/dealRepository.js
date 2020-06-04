const MongoHelper = require('../helpers/mongoHelper')

class DealRepository {
  async add (dealModels) {
    const dealCollection = await MongoHelper.getCollection('deals')
    const result = await dealCollection.insertMany(dealModels)
    return result.ops
  }

  async get () {
    const dealCollection = await MongoHelper.getCollection('deals')
    const result = await dealCollection.aggregate([
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                date: '$created_at',
                format: '%Y-%m-%d'
              }
            }
          },
          valor_total: { $sum: '$valor_total' },
          deals: { $push: '$$ROOT' }

        }
      }
    ]).toArray()
    return result
  }
}
module.exports = DealRepository
