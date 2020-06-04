const server = require('./server')
require('dotenv').config()
const MongoHelper = require('../infra/db/helpers/mongoHelper')
MongoHelper.connect(process.env.DB_URL)
  .then(async () => {
    server.listen(3000, () => console.log(`Server running on ${3000}`))
  })
