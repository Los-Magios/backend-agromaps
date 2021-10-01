const {body, check, result_validacion} = require('express-validator')

const validacionAddUser = () => {
    return [
        body('username', 'username no válido')
        .trim()
        .escape()
        .isLength({min: 4, max: 10}),
        body('password', 'password no válido')
        .trim()
        .escape()
        .isLength({min: 4, max: 20})
    ]
}

const validacionEditUser = () => {
    return [
        body('username', 'username no válido')
        .trim()
        .escape()
        .isLength({min: 4, max: 10}),
        body('password', 'password no válido')
        .trim()
        .escape()
        .isLength({min: 4, max: 20})
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
        return res.status(401).json({err})
    }
    next()
}

module.exports = {validacionAddUser, validacionEditUser, validarDeleteUser, validarCampos}