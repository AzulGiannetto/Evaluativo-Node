const express = require('express')
const People = require('./models/peopleModel')
const peopleRouter = require('./routes/peopleRouter')(People)
const authRouter = require('./routes/authRouter')(People)
// const errorHandler = require ('./middleware/errorHandler')
// falta lo de arriba
const httpStatus = require('../helpers/httpStatus')
const { expressjwt } = require('express-jwt')

const app = express()

require('./database/db')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//  para verificar si tiene token o no, necesito la plabra clave o frima y el algoritmo - el * es para todos
app.all(
  '/*',
  // el secret es la signature
  expressjwt({ secret: 'UnaContraseñaSecreta', algorithms: ['HS256'] }).unless({
  // camino que funcione todo el tiempo y no pida tokken
    path: ['/auth/login', '/auth/register']
  })
)

// esto me muestra que no estoy autorizado, es un middleware (entre peticion y respuesta)
app.use((err, _, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(httpStatus.UNAUTHORIZED).json({
      error: err.name,
      cause: 'Unauthorized. Missing or invalid token provided.'
    })
  } else {
    // en el next que es el tercer parametro hace que isga al siguiente middlewaire -en este caso rutas, despues controlador-
    //  si sucede un error se va al roximo middleware acarreando el error
    next(err)
  }
})

// puede considerarse un middleware pero es un router
app.use('/api', peopleRouter)
app.use('/', authRouter)

// este no es middleware
app.listen(5000, () => {
  console.log('Server is running')
})
