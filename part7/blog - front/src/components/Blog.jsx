import { useState } from 'react'

const Blog = ({ blog, user, addLikes, removeBlog }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const updateBlog = () => {
        const blogObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
        }
        addLikes(blog.id, blogObject)
    }

    const handleRemove = () => {
        window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        removeBlog(blog.id)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

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
                    <button id='like-button' onClick={updateBlog}>like</button>
                </p >
                <p>{blog.user !== null && blog.user.name}</p>
                {user.id === blog.user.id ?
                    <button id='delete-button' onClick={handleRemove}>remove</button>
                    :
                    <></>
                }
            </div>
        </div>
    )
}
export default Blog