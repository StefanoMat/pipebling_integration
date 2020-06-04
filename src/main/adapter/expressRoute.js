
module.exports = {
  adaptRoute: function (controller) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await controller.handle(httpRequest)
      if (httpResponse.statusCode === 200) {
        res.status(httpResponse.statusCode).json({ message: httpResponse.body })
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message
        })
      }
    }
  }
}
