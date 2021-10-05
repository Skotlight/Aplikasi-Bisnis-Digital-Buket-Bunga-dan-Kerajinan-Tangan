const bcrypt = require('bcryptjs')

const encode = password => { return bcrypt.hashSync(password, 8)}
const decode = (password, hashPassword) => {return bcrypt.compareSync(password, hashPassword)}

module.exports = {encode, decode}