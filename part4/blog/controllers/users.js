const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const result = await User.find({}).populate('blogs')
  response.json(result)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const password = body.password
  if (!password) {
    response.status(400).send({ error: 'password is required' })
  } else if (password.length < 3) {
    response.status(400).send({ error: 'password must have at least 3 characters' })
  } else {
    const saltRounds = 10

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }
})

module.exports = usersRouter
