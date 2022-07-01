const jwt = require('jsonwebtoken')

const generateToken = async () => {
  const token = jwt.sign(
    {
      data: 'datos aca'
    },
    'contraseña',
    { expiresIn: '1h' }
  )

  return token
}

module.exports = generateToken
