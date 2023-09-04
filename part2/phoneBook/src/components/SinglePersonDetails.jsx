import React from 'react'

const SinglePersonDetails = ({ name, number, filteredPerson }) => {
    return (
        <div>
            <ul>
                {filteredPerson.map((person) => (
                    <li key={person.name}> {person.name} {person.number} </li>
                ))}
            </ul>
        </div>
    )
}

export default SinglePersonDetails