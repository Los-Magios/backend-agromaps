const router = require('express').Router()
const { disableUser, obtenerUsers, obtenerUser, altaUser, editarUser } = require('../controllers/user.controllers')
const { validacionAddUser, validacionEditUser, validarDeleteUser, validarCampos } = require('../middleware/validacionesCampos.middlewares')

router.get('/get-users', obtenerUsers)
router.get('/get-user/:id', obtenerUser)
router.post('/create-user', altaUser)
router.put('/edit-user/:id', [validacionEditUser(), validarCampos], editarUser)
router.delete('/delete-user/:id', [validarDeleteUser(), validarCampos], disableUser)

module.exports = router