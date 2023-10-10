import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../request'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: 'anecdotes' })
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Anecdote service not available due to problems in server: {error.message}</span>
  }

  const anecdotes = data.sort((a, b) => {
    return b.votes - a.votes
  })

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
