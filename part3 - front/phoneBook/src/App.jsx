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
          .update(exisitingPerson._id, personObject)
          .then((response) => {
            setPersons(
              persons.map(person => person._id === exisitingPerson._id ? response.data : person
              )
            )
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
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
        .catch((error) => {
          setErrorMessage(error.response.data.error)
        })
      setNewName('')
      setNewPhone('')
    }
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
      <SinglePersonDetails persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  )
}

export default App

