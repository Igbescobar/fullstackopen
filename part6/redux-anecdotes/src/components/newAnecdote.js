import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { printNotification } from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdotesInput.value
        event.target.anecdotesInput.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(printNotification(`You have created "${content}"`))
        setTimeout(() => {
            dispatch(printNotification(''))
        }, 5000);
    }

    return (
        <div>
            <h2>Create anecdote!</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdotesInput" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote