const User = require('../models/user.model')

const obtenerUsers = async (req, res) => {
  const allUsers = await User.find()
  res.json(allUsers)
}

const obtenerUser = async (req, res) => {
  const currentUser = await User.findById(req.params.id)
  res.json(currentUser)
}

const altaUser = async (req, res) => {
  const { username, password } = req.body
  const newUser = new User({username, password})
  await newUser.save()
  res.json({msg: 'Usuario creado'})
}

const editarUser = async (req, res) => {
  const { username, password } = req.body
  await User.findByIdAndUpdate(req.params.id, {username, password})
  res.json({msg: 'Usuario modificado'})
}

const disableUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {estado: false})
  res.json({msg: 'Usuario inhabilitado'})
}

module.exports = {
  obtenerUser, obtenerUsers, altaUser, editarUser, disableUser
}