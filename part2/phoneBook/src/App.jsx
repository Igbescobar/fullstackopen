import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchFilter from './components/SearchFilter'
import NewPeopleForm from './components/NewPeopleForm'
import SinglePersonDetails from './components/SinglePersonDetails'

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newPhone, setNewPhone] = useState('')

  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
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
    if (persons.some(person => person.name === personObject.name)) {
      alert(`${personObject.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
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
      <SearchFilter handleFilter={handleFilter} />
      <NewPeopleForm handleNewPerson={handleNewPerson} handleNewPhone={handleNewPhone} newName={newName} newPhone={newPhone} newPerson={newPerson} />
      <h2>Numbers</h2>
      <SinglePersonDetails name={persons.name} number={persons.number} filteredPerson={filteredPerson} />
    </div>
  )
}

export default App

