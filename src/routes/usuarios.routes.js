const router = require('express').Router()

// Controllers
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuarios.controllers')

// Middlewares
const { vDeleteUsuario, vUsuario } = require('../middleware/vUsuarios.middlewares')
const { validateLogin, validateAdmin } = require('../middleware/login.middlewares')

router.get('/', [validateLogin, validateAdmin], getUsuarios)
router.get('/:id', [validateLogin], getUsuario)
router.put('/:id', [validateLogin, vUsuario], putUsuario)
router.post('/', [vUsuario], postUsuario)
router.delete('/:id', [validateLogin, validateAdmin, vDeleteUsuario], deleteUsuario)

module.exports = router