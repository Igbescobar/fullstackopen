import React, { useEffect } from 'react'
import personService from '../service/persons'

const SinglePersonDetails = ({ persons, setPersons, filter }) => {

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        personService
            .getAll()
            .then((response) => {
                setPersons(response.data)
            })
    }

    const handleDeleteClick = (id) => {
        if (window.confirm('Do you really want to delete this person?')) {
            personService
                .deletePerson(id)
                .then(() => {
                    fetchData()
                })
                .catch(error => {
                    console.error('Error deleting person:' + error);
                })
        }
    }

    const filteredPerson = persons.filter(person => {
        return (
            person.name.toLowerCase().includes(filter.toLowerCase())
        )
    })

    return (
        <div>
            <ul>
                {filteredPerson.map((person) => (
                    <li key={person._id}>
                        {person.name} {person.number}
                        <button onClick={(() => handleDeleteClick(person._id))}>delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SinglePersonDetails