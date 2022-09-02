const { body, check, validationResult } = require('express-validator')

const validacionUsuario = () => {
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

// const validarCampos = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {

//     const err = new Error(errors.array().map(el => el['msg']).toString());
//     err.status = 400;
//     next(err);
//   } else {
//     next();
//   }
// }

module.exports = { validacionUsuario, validarDeleteUser }