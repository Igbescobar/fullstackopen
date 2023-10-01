import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, user, addLikes }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const name = blog.user.name ? blog.user.name : user.name;

  const updateBlog = async () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    addLikes(blog.id, blogObject)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>View</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p> {blog.author}</p>
        <p>{blog.url}</p>
        <p> likes {blog.likes} <button onClick={updateBlog}>like</button></p >
        <p>{name}</p>
      </div>
    </div>
  )
}
export default Blog