const { MongoClient } = require('mongodb')

module.exports = {
  client: null,
  uri: null,

  connect: async function (uri) {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  disconnect: async function () {
    await this.client.close
  },
  getCollection: async function (name) {
    if (!this.client.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  map: function (collection) {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
