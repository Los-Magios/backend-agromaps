const generarJwt = require('../helpers/generar_jwt')
const userSchema = require('../models/usuario.model')
const bcrypt = require('bcrypt')

require('dotenv').config()

const login = async (req, res) => {
  try {
    const { usuario, clave } = req.body
    const user = await userSchema.findOne({ usuario })

    if (!user) {
      return res.status(400).json('El usuario no es válido')
    }

    const compararClave = await bcrypt.compare(clave, usuario.clave)

    if (!compararClave) {
      res.status(400).json("La contraseña es incorrecta")
    }

    const token = await generarJwt(usuario._id)
    res.status(200).json({ token })
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = { login }