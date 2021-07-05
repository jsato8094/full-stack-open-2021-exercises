const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'MongoError' && error.code === 11000) {
    return response.status(400).json({ error: 'given username already exists' })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}
