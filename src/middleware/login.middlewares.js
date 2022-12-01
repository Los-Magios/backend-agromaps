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
  const token = req.header('auth-token')
  const { id } = jwt.verify(token, process.env.FIRMA)

  const user = await Usuarios.findOne({ _id: id })
  
  if (user) {
    if (user.rol === 'admin') {
      return next()
    }
  } else {
    return res.status(401).json({ message: 'No se encontró el usuario' })
  }
  return res.status(401).json({ message: 'Debes tener acceso de administrador para realizar esta acción' })
};

module.exports = middleware
