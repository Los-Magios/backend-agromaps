const jwt = require('jsonwebtoken');
const Usuarios = require('../models/usuario.model')
const middleware = {};

middleware.validateLogin = async (req, res, next) => {
  try {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(400).json({ message: 'Error de autenticacion' });
    }

    const { id } = jwt.verify(token, process.env.FIRMA);

    if (id) {
      const usuario = await Usuarios.findByPk(id);
      if (usuario) {
        if (usuario.estado) {
          req.rol = usuario.rol;
          return next();
        }
        return res.status(401).json({ message: 'El usuario está inhabilitado' });
      }
    }
    return res.status(401).json({ message: 'Debe loguearse para acceder' });
  } catch (error) {
    const alert = catchHandler(error);
    res.status(alert.status).json({ message: alert.message });
  }
};

middleware.validateAdmin = (req, res, next) => {
  if (req.rol === 'admin') {
    return next();
  }
  return res.status(401).json({ message: 'Debes tener acceso de administrador para realizar esta acción' });
};

module.exports = middleware;
