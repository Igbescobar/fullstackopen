const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()

const Entry = require('./models/Entry')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/info', (request, response) => {
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

app.get('/api/persons', (request, response, next) => {
  Entry
    .find()
    .then((person) => {
      response.json(person)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {

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

  morgan.token('body', (req, res) => JSON.stringify(req.body))
  app.use(morgan(':body'))
})

app.get('/api/persons/:id', (request, response, next) => {
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

app.put('/api/persons/:id', (request, response, next) => {
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

app.delete('/api/persons/:id', (request, response, next) => {

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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})