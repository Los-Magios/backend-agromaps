const generarJwt = require('../helpers/generar_jwt')
const userSchema = require('../models/user.model')

require('dotenv').config()

const login = async(req, res) => {
    const {username, password} = req.body
    try {
        const { _id } = await userSchema.findOne({username, password})
        if(!_id) {
            return res.status(401).json('username no válido')
        }
        const id = _id.toString()
        const token = await generarJwt(id)
        res.status(200).json({token})
    }catch(err) {
        return res.status(500).json('Error' + err)
    }
}

module.exports = {login}