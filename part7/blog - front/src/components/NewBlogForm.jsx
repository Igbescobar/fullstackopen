import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            likes: 0
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <div>

            <h2>Create a new Blog!</h2>

            <form onSubmit={addBlog}>
                <div>
                    title
                    <input
                        id='title'
                        type="text"
                        value={title}
                        name='Title'
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder='write title'
                    />
                </div>
                <div>
                    author
                    <input
                        id='author'
                        type="text"
                        value={author}
                        name='Author'
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder='write author'

                    />
                </div>
                <div>
                    url
                    <input
                        id='url'
                        type="text"
                        value={url}
                        name='Url'
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder='write url'

                    />
                </div>
                <button id='create-button' type='submit'>create</button>
            </form>
        </div>
    )
}

export default NewBlogForm