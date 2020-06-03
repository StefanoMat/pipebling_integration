const axios = require('axios')

class BlingRequest {
  async post (data, apiKey) {
    // Construir XML com dados do data em um mapper
    const url = 'https://bling.com.br/Api/v2/pedidocompra/json/'
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const xmlContent = ''
    const response = await axios.post(url, { apikey: apiKey, xml: xmlContent }, config)
    return response
  }
}
module.exports = BlingRequest
