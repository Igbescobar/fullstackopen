const personsRouter = require('express').Router()
const Entry = require('../models/Entry')

const morgan = require('morgan')
personsRouter.use(morgan('tiny'))

personsRouter.get('/info', (request, response) => {
  let totalNumberPersons = 0
  const currentTime = new Date()
  Entry
    .find()
    .then((person) => {
      totalNumberPersons = person.length
      response.send(`<p>Phonebook has info for ${totalNumberPersons} people
    <br/>
    <p>${currentTime}`
      )
    })
})

personsRouter.get('/', (request, response, next) => {
  Entry
    .find()
    .then((person) => {
      response.json(person)
    })
    .catch((error) => next(error))
})

personsRouter.post('/', (request, response, next) => {

  const entry = new Entry({
    name: request.body.name,
    number: request.body.number,
  })

  entry
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))

  morgan.token('body', (req) => JSON.stringify(req.body))
  personsRouter.use(morgan(':body'))
})

personsRouter.get('/:id', (request, response, next) => {
  const id = Number(request.params.id)

  Entry
    .findById(id)
    .then((person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
      .catch((error) => next(error)))
})

personsRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body

  Entry
    .findByIdAndUpdate(
      request.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' })
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {

  Entry
    .findByIdAndRemove(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'Entry not found' })
      }
    })
    .catch((error) => next(error))
})

module.exports = personsRouter