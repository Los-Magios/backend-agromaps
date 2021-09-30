const router = require('express').Router()
const {disableUser, obtenerUsers, obtenerUser, altaUser, editarUser} = require('../controllers/user.controllers')

const {login} = require('../controllers/login.controllers')
const {validarLogin, bodyLogin} = require('../middleware/login.middlewares')

router.get('/', obtenerUsers)
router.get('/:id', obtenerUser)
router.post('/', altaUser)
router.put('/:id', editarUser)
router.delete('/:id', disableUser)

router.post('/login', bodyLogin(), validarLogin, login)

module.exports = router