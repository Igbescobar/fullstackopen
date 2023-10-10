import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdotesInput.value
        event.target.anecdotesInput.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you created '${content}'`, 10))
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