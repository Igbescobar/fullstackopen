import React from 'react'

import Header from './Header'
import Title from './Title'
import Content from './Content'
import Total from './Total'

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map((course) => {
                return (
                    <div key={course.id}>
                        <Header />
                        <Title title={course.name} />
                        <Content content={course.parts} />
                        <Total total={course.parts} />
                    </div>
                )
            })}
        </div>
    )
}

export default Course