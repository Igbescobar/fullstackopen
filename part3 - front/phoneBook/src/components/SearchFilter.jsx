import React from 'react'

const SearchFilter = ({ handleFilter }) => {

    return (
        <div> filter show with
            <input onChange={handleFilter} />
        </div>
    )
}

export default SearchFilter
