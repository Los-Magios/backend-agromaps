const jwt = require('jsonwebtoken');
const Usuarios = require('../models/usuario.model')
const middleware = {};

middleware.validateLogin = async (req, res, next) => {
  try {
    const token = req.header('auth-token')

    if (!token) {
      return res.status(400).json({ message: 'Error de autenticacion' })
    }

    const { id } = jwt.verify(token, process.env.FIRMA)

    if (id) {
      const usuario = await Usuarios.find({ _id: id})

      if (usuario) {
        console.log("usuario2: ", usuario)
        if (usuario.estado === false) {
          return res.status(401).json({ message: 'El usuario está inhabilitado' })
        }else{
          return next()
        }
      }
    }
    return res.status(401).json({ message: 'Debe loguearse para acceder' })
  } catch (error) {
    res.status(500).json(error)
  }
};

middleware.validateAdmin = async (req, res, next) => {
  const { usuario } = req.body
  const user = await Usuarios.findOne({ usuario: usuario })
  if (user.rol === 'admin') {
    return next()
  }
  return res.status(401).json({ message: 'Debes tener acceso de administrador para realizar esta acción' })
};

module.exports = middleware
