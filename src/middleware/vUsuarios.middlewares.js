const { body, check } = require('express-validator')
const { showErrors } = require('../helpers/showErrors')

const vUsuario = [
  body('usuario')
    .trim()
    .exists()
    .withMessage('Debe ingresar usuario')
    .isLength({ min: 6, max: 12 })
    .withMessage('El nombre de usuario debe tener entre 6 y 12 caracteres'),
  body('clave')
    .trim()
    .exists()
    .withMessage('Debe ingresar contraseña')
    .isLength({ min: 6, max: 20 })
    .withMessage('El nombre de usuario debe tener entre 6 y 20 caracteres'),
  body('correo')
    .trim()
    .exists()
    .withMessage('Debe ingresar correo')
    .isEmail()
    .withMessage('El formato de email es incorrecto'),
  body('rol')
    .trim()
    .exists()
    .withMessage('Debe ingresar su rol'),
  (req, res, next) => {
    showErrors(req, res, next)
  }
]

const vDeleteUsuario = () => {
  return [
    check('id', 'Id invalida')
      .trim()
      .isMongoId()
  ]
}

module.exports = { vUsuario, vDeleteUsuario }