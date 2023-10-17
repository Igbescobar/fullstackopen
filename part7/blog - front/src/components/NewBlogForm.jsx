import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlogForm = () => {
    const dispatch = useDispatch()

    const addBlog = (event) => {
        event.preventDefault()

        const title = event.target.Title.value
        const author = event.target.Author.value
        const url = event.target.Url.value

        event.target.Title.value = ''
        event.target.Author.value = ''
        event.target.Url.value = ''

        const newBlog = {
            title: title,
            author: author,
            url: url,
            likes: 0
        }

        dispatch(createBlog(newBlog))
        dispatch(setNotification(`a new blog ${title} by ${author} added`, 5))
    }
    return (
        <div>

            <h2>Create a new Blog!</h2>

            <form onSubmit={addBlog}>
                <div>
                    title
                    <input
                        name='Title'
                        placeholder='write title'
                    />
                </div>
                <div>
                    author
                    <input
                        name='Author'
                        placeholder='write author'

                    />
                </div>
                <div>
                    url
                    <input
                        name='Url'
                        placeholder='write url'

                    />
                </div>
                <button id='create-button' type='submit'>create</button>
            </form>
        </div>
    )
}

export default NewBlogForm