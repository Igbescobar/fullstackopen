import React from 'react'

const SinglePersonDetails = ({ filteredPerson, deletePerson }) => {

    const handleDeleteClick = (id) => {
        if (window.confirm('Do you really want to delete this person?')) {
            return (
                deletePerson(id)
            )
        }
    }

    return (
        <div>
            <ul>
                {filteredPerson.map((person) => (
                    <li key={person.name}>
                        {person.name}
                        {person.number}
                        <button onClick={(() => handleDeleteClick(person.id))}>delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SinglePersonDetails