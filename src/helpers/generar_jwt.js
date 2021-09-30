const jwt = require('jsonwebtoken')

const generarJwt = (uid = '') => {

    return new Promise((resolve, reject) => {
        jwt.sign( {uid}, process.env.SING, (err, token) => {
            if(err) {
                reject("error al crear el token")
            }
            resolve(token)
        })
    })
}

module.exports = generarJwt