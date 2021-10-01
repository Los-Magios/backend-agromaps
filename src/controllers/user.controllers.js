const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const obtenerUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ estado: true })
    res.json(allUsers)
  } catch (err) {
    console.error("Error en controlador ObtenerUsers", err)
  }

}

const obtenerUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id)
    res.json(currentUser)
  } catch (err) {
    console.error("Error en controlador ObtenerUser", err)
  }

}

const altaUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const newPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: newPassword })
    await newUser.save()
    res.json({ msg: 'Usuario creado correctamente' })
  } catch (err) {
    console.error("Error en controldor altaUser", err)
  }
}

const editarUser = async (req, res) => {
  try {
    const { username, password } = req.body
    await User.findByIdAndUpdate(req.params.id, { username, password })
    res.json({ msg: 'Usuario modificado correctamente' })
  } catch (err) {
    console.error("Error en controlador editarUser", err)
  }
}

const disableUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.body, { estado: false })
    res.json({ msg: 'Usuario inhabilitado' })
  } catch (err) {
    console.error("Error en controlador disableUser", err)
  }
}

module.exports = {
  obtenerUser, obtenerUsers, altaUser, editarUser, disableUser
}