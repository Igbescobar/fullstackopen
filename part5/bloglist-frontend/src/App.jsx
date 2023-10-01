import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification.jsx'
import SuccessMessage from './components/SucessMessage'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm/LoginForm'
import NewBlogForm from './components/newBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [refreshBlog, setRefreshBlog] = useState(false)
  const loginFormRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll().then(blogs =>
        setBlogs(blogs)
      )
  }, [refreshBlog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (createLogin) => {

    try {
      const user = await loginService.login(createLogin)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      loginFormRef.current.toggleVisibility()
      setUser(user)
      setMessage('Log-in succesful')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const newBlog = async (blogObject) => {

    try {
      const blog = await blogService.create(blogObject)
      setBlogs([...blogs, blog])
      blogFormRef.current.toggleVisibility()
      setMessage(`a new blog "${blog.title}" by ${blog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    } catch (exception) {
      setErrorMessage('Wrong values')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLikes = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    setRefreshBlog(!refreshBlog)
  }

  return (
    <div>
      <h1>Blogs</h1>

      <SuccessMessage message={message} />
      <Notification message={errorMessage} />
      {!user ?
        <div>
          <Togglable buttonLabel="login" ref={loginFormRef}>
            <LoginForm
              createLogin={handleLogin}
            />
          </Togglable>
        </div>
        :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm createBlog={newBlog} />
          </Togglable>
          <br />
          <h2>List of current Blogs</h2>
          {blogs.map(blog =>
            <div key={blog.id} >
              <Blog blog={blog} user={user} addLikes={addLikes} />
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default App