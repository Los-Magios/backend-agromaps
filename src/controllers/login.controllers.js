const generarJwt = require('../helpers/generar_jwt')
const userSchema = require('../models/user.model')
const bcrypt = require('bcrypt')

require('dotenv').config()

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const usuario = await userSchema.findOne({username})
        if(!usuario) {
            return res.status(400).json('usuario no válido')
        }
        const existeUsuario = await bcrypt.compare(password, usuario.password)
        if (!existeUsuario) {
            res.status(400).json("usuario no válido")
        }
        const token = await generarJwt(usuario._id)
        res.status(200).json({token})
    }catch(err) {
        return res.status(500).json('Error en login.controllers' + err)
    }
}

module.exports = { login }