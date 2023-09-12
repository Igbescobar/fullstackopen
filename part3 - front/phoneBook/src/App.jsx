import { useState, useEffect } from 'react'
import personService from './service/persons'
import SearchFilter from './components/SearchFilter'
import NewPeopleForm from './components/NewPeopleForm'
import SinglePersonDetails from './components/SinglePersonDetails'
import Message from './components/Message'
import ErrorMessage from './components/ErrorMessage'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newPhone, setNewPhone] = useState('')

  const [filter, setFilter] = useState('')

  const [message, setMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  const filteredPerson = persons.filter(person => {
    return (
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const newPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newPhone
    }

    const exisitingPerson = persons.find(person => person.name === personObject.name)
    if (exisitingPerson) {
      const confirmUpdate = window.confirm(`${exisitingPerson.name} is already added to the phonebook, replace the old number with the new one?`)
      if (confirmUpdate) {
        personService
          .update(exisitingPerson.id, personObject)
          .then((response) => {
            setPersons(
              persons.map(person => person.id === exisitingPerson.id ? response.data : person
              )
            )
          })
          .catch(error => {
            setErrorMessage(`Information of ${personObject.name} has been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.name !== personObject.name))
            console.log(error)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      setNewName('')
      setNewPhone('')
    }
  }

  const deletePerson = (id) => {
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleNewPerson = (e) => {
    setNewName(e.target.value)
  }

  const handleNewPhone = (e) => {
    setNewPhone(e.target.value)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <ErrorMessage message={errorMessage} />
      <SearchFilter handleFilter={handleFilter} />
      <NewPeopleForm handleNewPerson={handleNewPerson} handleNewPhone={handleNewPhone} newName={newName} newPhone={newPhone} newPerson={newPerson} />
      <h2>Numbers</h2>
      <SinglePersonDetails filteredPerson={filteredPerson} deletePerson={deletePerson} />
    </div>
  )
}

export default App

