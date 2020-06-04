const express = require('express')
class App {
  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use('/v1', require('./v1/routes'))
  }
}
module.exports = new App().express
