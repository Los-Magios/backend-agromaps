const express = require('express')
const app = express()
const morgan = require('morgan')
require('./database')
require('dotenv').config()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))

// Rutes
app.use('/usuarios', require('./routes/usuarios.routes'))
app.use('/login', require('./routes/login.routes'))
app.use('layers', require('./routes/capas.routes'))

// Settings
app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en puerto ${app.get('port')}`)
})
