const jwt = require('jsonwebtoken')
const userSchema = require('../models/user.model')
// const { validarLogin } = require('./login.middlewares')

require('dotenv').config()

const validarToken = async(req, res, next) => {
    const token = req.headers.token
    if(!token) {
        return res.status(400).json('Token invalido')
    }
    try {
        const { id } = await jwt.verify(token, process.env.FIRMA)
        const datosDeUsuario = await userSchema.findOne({_id: id, estado: true})

        if(!datosDeUsuario) {
            return res.status(400).json('Token invalido')
        }

        req.usuarioRol = datosDeUsuario.rol

        next()
    } catch (error) {
        return res.status(400).json('Token invalido', err)
    }
}

module.exports = validarToken