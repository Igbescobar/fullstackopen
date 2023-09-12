import React from 'react'

const CountryForm = ({ handleCountry, newSearch }) => {
    return (
        <form onSubmit={newSearch}>
            find countries <input onChange={handleCountry} />
            <button type="submit">add</button>
        </form>
    )
}

export default CountryForm