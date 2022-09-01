const { body, check, result_validacion } = require('express-validator')

const validacionAddUser = () => {
  return [
    body('usuario', 'El usuario no es válido')
      .trim()
      .escape()
      .isLength({ min: 6, max: 12 }),
    body('clave', 'La contraseña no es válida')
      .trim()
      .escape()
      .isLength({ min: 6, max: 20 })
  ]
}

const validarDeleteUser = () => {
  return [
    check('id', 'Id invalida')
      .trim()
      .escape()
      .isMongoId()
  ]
}

const validarCampos = (req, res, next) => {
  const err = result_validacion(req)
  if (!err.isEmpty()) {
    return res.status(401).json({ err })
  }
  next()
}

module.exports = { validacionAddUser, validarDeleteUser, validarCampos }