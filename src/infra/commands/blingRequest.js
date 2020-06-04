const axios = require('axios')
const qs = require('querystring')
const BlingXml = require('../blingXml')

class BlingRequest {
  async post (data, apiKey) {
    const url = 'https://bling.com.br/Api/v2/pedido/json'
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }
    for (const deal in data) {
      const bling = new BlingXml()
      const xmlOrder = bling.buildOrder(data[deal])
      const formData = qs.stringify({ apikey: apiKey, xml: xmlOrder })
      await axios.post(url, formData, config)
    }
    return true
  }
}
module.exports = BlingRequest
