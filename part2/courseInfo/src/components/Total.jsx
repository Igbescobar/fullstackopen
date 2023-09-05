import React from 'react'

const Total = ({ total }) => {

    const exerciseTotal = total.reduce((accumulator, current) => accumulator + current.exercises,
        0
    )


    return (
        <div>
            <p><strong>Total number of exercises: {exerciseTotal}</strong></p>
        </div>
    )
}

export default Total