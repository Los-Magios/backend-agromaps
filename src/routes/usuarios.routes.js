const router = require('express').Router()

// Controllers
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario, getUbicaciones, postUbicaciones } = require('../controllers/usuarios.controllers')

// Middlewares
const { vUsuario } = require('../middleware/vUsuarios.middlewares')
const { validateLogin, validateAdmin } = require('../middleware/login.middlewares')

router.get('/', getUsuarios)
router.get('/:id', [validateLogin], getUsuario)
router.get('/ubicaciones/:id', getUbicaciones)
router.put('/:id', [validateLogin, vUsuario], putUsuario)
router.post('/', [vUsuario], postUsuario)
router.post('/ubicaciones/:id', postUbicaciones)
router.delete('/:id', [validateLogin, validateAdmin], deleteUsuario)

module.exports = router