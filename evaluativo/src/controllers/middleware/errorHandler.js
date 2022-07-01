// dice que error paso, ejemplo que la info este repetida cuando especifico que no se puede

const ERROR_HANDLER = {
  // como no se el numero de error, uso uno por defecto en el manejador de errores. Puedo agregar errores nuevos y personalizar
  defaultError: (res, err) =>
    res.status(500).send({ error: err.name, cause: err.message })
}

const errorHandler = (err, req, res, next) => {
// response porque tiene que dar una respuesta y error porque necesita saber que le paso
  const handler = ERROR_HANDLER[err.name] || ERROR_HANDLER[err.code] || ERROR_HANDLER.defaultError
  // puedo asignarle una propiedad (que puede ser prop, valor, funcion, objeto) o una funcion
  handler(res, err)
}

module.exports = errorHandler
