import React from 'react'

const NewPeopleForm = ({ newName, handleNewPerson, newPhone, handleNewPhone, newPerson }) => {

    return (
        <form onSubmit={newPerson}>
            <h2>Add a new</h2>
            <div>name: <input value={newName} onChange={handleNewPerson} /> </div>
            <div>number: <input value={newPhone} onChange={handleNewPhone} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default NewPeopleForm