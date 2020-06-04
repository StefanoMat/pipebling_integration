const DealsController = require('../../service/controllers/deals')
const DealRepository = require('../../infra/db/repository/dealRepository')

module.exports = {
  makeDealsController: function () {
    const dealRepository = new DealRepository()
    const dealsController = new DealsController(dealRepository)
    return dealsController
  }
}
