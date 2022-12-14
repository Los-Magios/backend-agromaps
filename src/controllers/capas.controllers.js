const Model = require('../models/capas.model')

const getCapas = async (req, res) => {
  try {
    const capas = await Model.find()
    if (capas) {
      return res.status(200).json(capas);
    }else{
      return res.status(400).json({ message: 'No se encontrĂ³ ninguna capa en la base de datos' })
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

const postCapa = async (req, res) => {
  try {
    const { titulo, api, simbologia, descripcion } = req.body
    // descipcion: { color, categoria}
    // simbologia: img de las categorias
    const nuevaCapa = new Model({
      titulo, api, simbologia, descripcion
    })
    await nuevaCapa.save()
    return res.status(201).json({ message: 'La capa ha sido creado correctamente' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  getCapas, postCapa
}