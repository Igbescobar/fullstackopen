import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification.jsx'
import blogService from './services/blogsService.js'
import loginService from './services/login'
import LoginForm from './components/LoginForm.jsx'
import NewBlogForm from './components/newBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { initializeUser, logout } from './reducers/authReducer.js'
import { initializeAllUsers } from './reducers/userReducer.js'


const App = () => {
  const authUser = useSelector(state => state.authUser)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUsers())
  }, [dispatch])

  if (authUser === null) {
    return (
      <LoginForm />
    )
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <p> {authUser.name} logged in </p>
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>
      <br />
      <h2>List of current Blogs</h2>
      <BlogList />
    </div>
  )
}

export default App