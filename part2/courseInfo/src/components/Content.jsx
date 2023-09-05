import React from 'react'

const Content = ({ content }) => {
    return (
        <div>
            {content.map((content) => {
                return (
                    <div key={content.id}>
                        <p >{content.name} {content.exercises}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Content