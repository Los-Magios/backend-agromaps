require("dotenv").config()

const mongoose = require('mongoose')

mongoose.connect(process.env.URI)
    .then(() => console.log('conexión exitosa'))
    .catch(err => console.log(err))

module.exports = mongoose