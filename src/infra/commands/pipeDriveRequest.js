const axios = require('axios')

class PipeDriveRequest {
  async get (apiKey) {
    const url = `https://linkapi-sandbox3.pipedrive.com/v1/deals?status=won&start=0&api_token=${apiKey}`
    const response = await axios.get(url)
    return response.data
  }
}
module.exports = PipeDriveRequest
