const jwt = require('jsonwebtoken');
const User = require('../models/usuario.model')
const bcrypt = require('bcrypt');

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({ estado: true })
    if (usuarios) {
      return res.status(200).json(usuarios);
    }else{
      return res.status(400).json({ message: 'No se encontró ningun usuario en la base de datos' })
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getUsuario = async (req, res) => {
  try {
    const token = req.header('auth-token')
    const { id } = jwt.verify(token, process.env.FIRMA)
    const user = await User.findById(req.params.id)
    
    // un usuario puede ver sus datos
    if(id == user._id) {
        return res.status(200).json(user);
    } else {
      return res.status(203).json({ message: 'La información que solicita no está disponible' })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

const getUbicaciones = async (req, res) => {
  try {
    const token = req.header('auth-token')
    const { id } = jwt.verify(token, process.env.FIRMA)
    const user = await User.findById(req.params.id)

    if (id == user._id) {
      return res.status(200).json({ubicaciones: user.ubicaciones})
    } else {
      return res.status(203).json({ message: 'La información que solicita no está disponible' })
    }    
  } catch (error) {
    return res.status(500).json(error)
  }
}

const postUbicaciones = async (req, res) => {
  try {
    const id = req.params.id // id usuario
    const user = await User.findById(id)
    const { ubicacion } = req.body

    if(user) {
      await User.findByIdAndUpdate(id,
        { $push: { 'ubicaciones': ubicacion } })
      return res.status(200).json({ message: 'La ubicación se agregó correctamente' }) 
    } else {
      return res.status(203).json({ message: 'No se encontró el usuario' }) 
    }

  } catch (error) {
    return res.status(500).json(error)
  }
}

const postUsuario = async (req, res) => {
  try {
    const { usuario, clave, correo, rol, ubicaciones } = req.body
    const newClave = await bcrypt.hash(clave, 10)
    const newUser = new User({
      usuario, correo, rol, ubicaciones, clave: newClave
    })
    await newUser.save()
    return res.status(201).json({ message: 'El usuario ha sido creado correctamente' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

const putUsuario = async (req, res) => {
  try {
    const token = req.header('auth-token')
    const { id } = jwt.verify(token, process.env.FIRMA)
    const user = await User.findById(req.params.id)

    if (id == user._id) {
      const newClave = await bcrypt.hash(clave, 10)
      await User.findByIdAndUpdate(id, { usuario, correo, rol, ubicaciones, clave: newClave })
      return res.status(200).json({ message: 'Los datos han sido modificado correctamente' })
    } else {
      return res.status(203).json({ message: 'La información que solicita no está disponible' })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteUsuario = async (req, res) => {
  try {
    const token = req.header('auth-token')
    const { id } = jwt.verify(token, process.env.FIRMA)
    const user = await User.findById(req.params.id)
    
    if (id == user._id || user.rol == "admin") {
      await User.findByIdAndUpdate(id, { estado: false })
      return res.status(200).json({ message: 'EL usuario ha sido inhabilitado correctamente' })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario, getUbicaciones, postUbicaciones
}