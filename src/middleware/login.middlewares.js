const {body, result_validacion} = require('express-validator')

const bodyLogin = () => {
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

const validarLogin = (req, res, next) => {
    const err = result_validacion(req)
    if (!err.isEmpty()) {
        return res.status(401).json({err})
    }
    next()
}

module.exports = {validarLogin, bodyLogin}