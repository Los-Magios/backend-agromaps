const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  usuario: {
    type: String, required: true
  },
  clave: {
    type: String, required: true
  },
  correo: {
    type: String, required: true
  },
  telefono: {
    type: String, default: null
  },
  estado: {
    type: Boolean, default: true
  },
  rol: {
    type: String, default: 'comun'
  }
})

module.exports = model('Usuario', userSchema)