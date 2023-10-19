import { useEffect, useRef } from 'react'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import NewBlogForm from './components/newBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { initializeUser, logout } from './reducers/authReducer.js'
import { initializeAllUsers } from './reducers/userReducer.js'
import UsersDisplay from './components/UsersDisplay.jsx'
import {
  Routes, Route, Link
} from 'react-router-dom'
import Blog from './components/Blog.jsx'
import { Nav, Navbar } from 'react-bootstrap'
import User from './components/User.jsx'


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUsers())
  }, [dispatch])

  const authUsers = useSelector(state => state.authUser)

  const usersText = useSelector(state => state.users)
  console.log('this is the users', usersText)


  const blogFormRef = useRef()


  if (authUsers === null) {
    return (
      <LoginForm />
    )
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  const padding = {
    padding: 5
  }

  const Home = () => {
    return (
      <div>
        <h2>Blogs App</h2>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <NewBlogForm />
        </Togglable>
        <BlogList />
      </div>
    )
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/'>home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/blogs'>blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/users'>users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {authUsers
                ? <em> {authUsers.name} logged in </em>
                : <Link style={padding} to='/login'>login</Link>
              }
            </Nav.Link>
            <button type="submit" onClick={handleLogout}>
              logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<UsersDisplay />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>

  )
}

export default App