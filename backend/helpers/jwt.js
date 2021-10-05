const jwt = require('jsonwebtoken')
const jwt_secret = "token"

const sign = payload => {return jwt.sign(payload, jwt_secret)}
const verify = token => {return jwt.verify(token, jwt_secret)}

module.exports = {sign, verify}