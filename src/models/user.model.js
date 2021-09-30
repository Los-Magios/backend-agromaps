const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String, required: true
  },
  password: {
    type: String, required: true
  },
  estado: {
    type: Boolean, default: true
  },
  rol: {
    type: String, default: 'user', required: true
  }
})

module.exports = model('User', userSchema)