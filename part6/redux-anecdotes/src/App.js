import { useEffect } from "react"
import Anecdotes from "./components/Anecdotes"
import VisibilityFilter from "./components/VisibilityFilter"
import NewAnecdote from "./components/newAnecdote"
import Notification from "./components/Notification"
import anecdotesService from './services/anecdotes'
import { setAnecdote } from './reducers/anecdoteReducer'
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService
      .getAll()
      .then(anecdotes => dispatch(setAnecdote(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <VisibilityFilter />
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App