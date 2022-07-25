require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()



const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan('tiny'))
//app.use(requestLogger)
let persons = [
    {
        'id': 1,
        'name': 'Arto Hellas',
        'number': '040-123456'
    },
    {
        'id': 2,
        'name': 'Ada Lovelace',
        'number': '39-44-5323523'
    },
    {
        'id': 3,
        'name': 'Dan Abramov',
        'number': '12-43-234345'
    },
    {
        'id': 4,
        'name': 'Mary Poppendieck',
        'number': '39-23-6423122'
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    //const id=Number(request.params.id)
    //const person= persons.find(person => person.id === id)
    Person.findById(request.params.id).then(person => {
        if(person){
            response.json(person)
        }else{
            response.status(404).end()
        }
    })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response) => {
    Person.findOneAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
    //const id= Number(request.params.id)
    //persons = persons.filter(person => person.id !==id)

})

app.get('/info', (request, response) => {
    Person.countDocuments({}, function(err , count){
        var number = count
        console.log(number)
        response.send(`Phonebook has numbers for ${number} people, ${new Date()}`)
    })

})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(!body.name){
        return response.status(400).json({ error: 'name missing' })
    }
    if(!body.number){
        return response.status(400).json({ error: 'number missing' })
    }
    const sameName = persons.find(person => person.name===body.name)
    if(sameName){
        return response.status(400).json({ error: 'name must be unique' })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
        //id: Math.floor(Math.random()*10000),
    })
    //persons = persons.concat(person)
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => next(error))
    //response.json(person)
})



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request ,response, next) => {
    console.error(error.message)

    if (error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError') {
        return response.status(400).json({ error:error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})