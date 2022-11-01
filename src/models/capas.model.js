const { model, Schema } = require('mongoose')

const capasSchema = new Schema({
  titulo: {
    type: String
  },
  api: {
    type: String
  }
})

module.exports = model('capas', capasSchema)