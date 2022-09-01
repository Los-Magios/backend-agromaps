const jwt = require('jsonwebtoken')
const userSchema = require('../models/usuario.model')
require('dotenv').config()

const validarToken = async (req, res, next) => {
  const token = req.headers.token
  if (!token) {
    return res.status(400).json('Token invalido')
  }

  try {
    const { id } = jwt.verify(token, process.env.FIRMA)
    const datosDeUsuario = await userSchema.findOne({ _id: id, estado: true })

    if (!datosDeUsuario) {
      return res.status(400).json('Token invalido')
    }

    req.rol = datosDeUsuario.rol
    next()
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = validarToken