import Anecdotes from "./components/Anecdotes"
import VisibilityFilter from "./components/VisibilityFilter"
import NewAnecdote from "./components/newAnecdote"

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <VisibilityFilter />
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App