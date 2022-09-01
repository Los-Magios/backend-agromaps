const jwt = require('jsonwebtoken')
require('dotenv').config()

const generarJwt = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, process.env.FIRMA, (err, token) => {
      if (err) {
        reject("Hubo un error al generar el token", err)
      }
      resolve(token)
    })
  })
}

module.exports = generarJwt