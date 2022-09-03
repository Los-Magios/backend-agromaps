const Usuarios = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');
const createJwt = require('../helpers/generar_jwt');
const controller = {};

controller.login = async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const user = await Usuarios.findOne({ usuario });
    if (user) {
      if (user.estado) {
        const validation = bcryptjs.compareSync(clave, user.clave) || clave === user.clave;

        if (validation) {
          const { usuario: username, rol, _id } = user;
          const token = await createJwt(_id);
          return res.status(200).json({ message: 'Bienvenido', user: { usuario: username, rol, token } });
        }

        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
      return res.status(400).json({ message: 'El usuario está inhabilitado' });
    }
    return res.status(400).json({ message: 'Usuario no encontrado' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// controller.logout = async (req, res) => {
//   try {
//     res.status(200).json({ message: 'Usuario deslogueado' });
//   } catch (error) {
//     const alert = catchHandler(error);
//     res.status(alert.status).json({ message: alert.message });
//   }
// };

module.exports = controller;
