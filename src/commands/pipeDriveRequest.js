const http = require('http')

class PipeDriveRequest {
  async get (apiKey) {
    const options = {
      host: `https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${apiKey}`,
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    }
    const result = http.get(options, function (resp) {
      resp.on('data', function (data) {
        return data
      })
    }).on('error', function () {
      throw Error()
    })

    return result
  }
}
module.exports = PipeDriveRequest
