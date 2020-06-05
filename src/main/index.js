const server = require('./server')
require('dotenv').config()
const MongoHelper = require('../infra/db/helpers/mongoHelper')
MongoHelper.connect(process.env.DB_URL)
  .then(async () => {
    server.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`))
  })
