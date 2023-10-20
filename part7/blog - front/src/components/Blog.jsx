import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, deleteBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLike = () => {
        dispatch(addLike(blog))
        dispatch(setNotification(`You added one like for "${blog.title}"!`, 5))
    }

    return (
        <div style={blogStyle} className='blog'>
            <div className='whenHidden'>
                <Link to={`/blogs/${blog.id}`}>
                    <p>{blog.title} {blog.author}</p>
                </Link>
            </div>
        </div >
    )
}
export default Blog