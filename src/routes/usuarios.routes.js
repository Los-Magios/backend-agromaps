const router = require('express').Router()
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuarios.controllers')
const { validacionAddUser, validarDeleteUser, validarCampos } = require('../middleware/validacionesCampos.middlewares')

router.get('/', getUsuarios)
router.get('/:id', getUsuario)
router.post('/', [validacionAddUser(), validarCampos], postUsuario)
router.put('/editar/:id', [validacionAddUser(), validarCampos], putUsuario)
router.delete('/:id', [validarDeleteUser(), validarCampos], deleteUsuario)

module.exports = router