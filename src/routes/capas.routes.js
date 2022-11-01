const router = require('express').Router()

// Controllers
const { getCapas, postCapa } = require('../controllers/capas.controllers')

// Middlewares
// const { vUsuario } = require('../middleware/vUsuarios.middlewares')
// const { validateLogin, validateAdmin } = require('../middleware/login.middlewares')

router.get('/', getCapas)
router.post('/', postCapa)

module.exports = router