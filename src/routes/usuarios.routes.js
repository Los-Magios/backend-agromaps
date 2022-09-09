const router = require('express').Router()

// Controllers
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario, getUbicaciones } = require('../controllers/usuarios.controllers')

// Middlewares
const { vUsuario } = require('../middleware/vUsuarios.middlewares')
const { validateLogin, validateAdmin } = require('../middleware/login.middlewares')

router.get('/', [validateLogin, validateAdmin], getUsuarios)
router.get('/:id', [validateLogin], getUsuario)
router.get('/ubicaciones/:id', getUbicaciones)
router.put('/:id', [validateLogin, vUsuario], putUsuario)
router.post('/', [vUsuario], postUsuario)
router.delete('/:id', [validateLogin, validateAdmin], deleteUsuario)

module.exports = router