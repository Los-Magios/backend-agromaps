const User = require('../models/usuario.model')
const bcrypt = require('bcrypt');

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({ estado: true })
    if (usuarios) {
      return res.status(200).json(usuarios);
    }else{
      return res.status(400).json({ message: 'No se encontró ningun usuario en la base de datos' });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getUsuario = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id)
    if (usuario) {
      return res.status(200).json(usuario);
    } else {
      return res.status(400).json({ message: 'No se encontró el usuario en la base de datos' });
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

const postUsuario = async (req, res) => {
  try {
    const { username, password } = req.body
    const newPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      username, password: newPassword
    })
    await newUser.save()
    return res.status(201).json({ message: 'El usuario ha sido creado correctamente' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

const putUsuario = async (req, res) => {
  try {
    const usuario = await findById(req.params.id)
    if (usuario) {
      const { username, password } = req.body
      await User.findByIdAndUpdate(req.params.id, { username, password })
      return res.status(200).json({ message: 'El usuario ha sido modificado correctamente' })
    } else {
      return res.status(400).json({ message: 'No se encontró el usuario en la base de datos' })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteUsuario = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.body, { estado: false })
    return res.status(200).json({ message: 'EL usuario ha sido inhabilitado correctamente' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario
}