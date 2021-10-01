const router = require('express').Router()
const { login } = require('../controllers/login.controllers')

router.post('/', login)

module.exports = router