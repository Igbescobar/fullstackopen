import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, deleteBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()

    const authUser = useSelector(state => state.authUser)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleLike = () => {
        dispatch(addLike(blog))
        dispatch(setNotification(`You added one like for "${blog.title}"!`, 5))
    }

    const handleDelete = () => {
        window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        dispatch(deleteBlogs(blog.id))
        dispatch(setNotification(`You deleted "${blog.title}" !`, 5))
    }

    const showDelete = blog.user.username === authUser.username ? true : false

    return (
        <div style={blogStyle} className='blog'>
            <div style={hideWhenVisible} className='whenHidden'>
                <p>{blog.title} {blog.author} <button id='show-button' onClick={toggleVisibility}>View</button></p>
            </div>
            <div style={showWhenVisible} className='whenShowing'>
                <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
                <p> {blog.author}</p>
                <p>{blog.url}</p>
                <p>
                    likes {blog.likes}
                    <button id='like-button' onClick={handleLike}>like</button>
                </p >
                <p>{blog.user !== null && blog.user.name}</p>
                {showDelete && <button onClick={handleDelete} id="remove-button">
                    remove
                </button>}
            </div>
        </div>
    )
}
export default Blog