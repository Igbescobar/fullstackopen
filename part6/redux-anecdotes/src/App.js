import Anecdotes from "./components/Anecdotes"
import VisibilityFilter from "./components/VisibilityFilter"
import NewAnecdote from "./components/newAnecdote"
import Notification from "./components/Notification"

const App = () => {
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