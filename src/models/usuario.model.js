const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  usuario: {
    type: String
  },
  clave: {
    type: String
  },
  correo: {
    type: String
  },
  telefono: {
    type: String,
    default: null
  },
  estado: {
    type: Boolean,
    default: true
  },
  rol: {
    type: String,
    enum: ['asesor', 'productor', 'admin']
  },
  ubicaciones: [{
    lat: String,
    lon: String
  }]
})

module.exports = model('Usuario', userSchema)