const express = require('express')
const morgan = require("morgan");
const cors = require('cors')
const app = express()

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':body'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const totalNumberPersons = persons.length
    const currentTime = new Date()

    response.send(`<p>Phonebook has info for ${totalNumberPersons} people
    <br/>
    <p>${currentTime}`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)

    if (person) {
        response.json(person)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)


    response.status(204).end()
})

const generatedId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    console.log(maxId)
    return maxId + 1
}

app.post('/api/persons', (request, response) => {

    if (!request.body) {
        return response.status(404).json({
            error: 'body is missing'
        })
    }

    if (!request.body.name || !request.body.number) {
        return response.status(404).json({
            error: 'name or number is missing'
        })
    }

    const findCoincideName = persons.find(person => person.name === request.body.name)

    if (findCoincideName) {
        return response.status(404).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: request.body.name,
        number: request.body.number || 0,
        id: generatedId()
    }

    persons = persons.concat(person)
    response.json(person)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})