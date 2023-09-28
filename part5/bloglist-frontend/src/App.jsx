import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification.jsx'
import SuccessMessage from './components/SucessMessage'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll().then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title, author, url,
      })
      setBlogs([...blogs, blog])
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const blogForm = () => (
    <form onSubmit={handleNewBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )

  return (
    <div>
      <h1>Blogs</h1>

      <SuccessMessage message={message} />
      <Notification message={errorMessage} />
      {!user ?
        <div>
          <h2>Log in to the application</h2>
          {loginForm()}
        </div>
        :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <h2>Create a new blog!</h2>
          {blogForm()}
          <br />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App