import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({person}) =>{
  return(
  <p>
    {person.name} {person.number} {person.id} <button type="submit">delete</button>
  </p>)
}

const Persons = ({personsToShow}) => 
{
  
}

const Notification = ({ message }) => {
  const notificationStyle = {color: 'green',background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10}
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle} className='error'>
      {message}
    </div>
  )
}

const Filter = ({}) =>{
  
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const personsToShow = showAll ? persons : persons.filter(person=>person.name.toLowerCase().includes(newSearch.toLowerCase()))

  const addPerson = (event) =>{
    event.preventDefault()
    console.log(newName)
    const personObject = {name: newName,number: newNumber}
      if(persons.some(el=>el.name===newName)){
      alert(`${newName} is already added to phonebook`)
    }else{   
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(personObject)) 
        setErrorMessage(`${personObject.name} was added`)
      })
    }
  }

  const handleErrorChange = (event) =>{

  }

  const deletePersonHandler = (id) =>{
    personService.deletePerson(id)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <div>
          name: <input value={newSearch} 
          onChange={handleSearchChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} 
          onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={newNumber} 
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div> 
        {personsToShow.map(person =><Person key={person.name} person={person} deletePersonHandler={deletePersonHandler}/>)}    
      </div>      
    </div>
  )
}

export default App