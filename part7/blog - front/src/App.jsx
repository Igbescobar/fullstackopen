import { useEffect, useRef } from 'react'
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
import { Nav, Navbar } from 'react-bootstrap'
import User from './components/User.jsx'
import IndividualBlog from './components/IndividualBlog.jsx'
import { initializeComments } from './reducers/commentReducer.js'


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

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  if (authUsers === null) {
    return (
      <LoginForm />
    )
  }

  const padding = {
    padding: 5
  }

  const Home = () => {
    return (
      <div>
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
      <br />
      <h2>Blog app</h2>
      <br />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<UsersDisplay />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs' element={<BlogList />} />
        <Route path='/blogs/:id' element={<IndividualBlog />} />
      </Routes>
    </div>

  )
}

export default App