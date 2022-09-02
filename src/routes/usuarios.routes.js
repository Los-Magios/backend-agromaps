const router = require('express').Router()
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuarios.controllers')
const {validarDeleteUser } = require('../middleware/validacionesCampos.middlewares')

router.get('/', getUsuarios)
router.get('/:id', getUsuario)
router.post('/', postUsuario)
router.put('/editar/:id', putUsuario)
router.delete('/:id', deleteUsuario)

module.exports = router