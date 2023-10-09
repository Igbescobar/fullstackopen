import { useDispatch, useSelector } from "react-redux";
import { addVotes } from "../reducers/anecdoteReducer";
import { printNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <p>{anecdote.content}</p>
            <p>has {anecdote.votes} <button onClick={handleClick}>
                vote
            </button>
            </p>
        </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filters === null) {
            return state.anecdotes
                .sort((a, b) => b.votes - a.votes)
        }
        return state.anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase()
                .includes(state.filters.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
    })

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        dispatch(addVotes(anecdote.id))
                        dispatch(printNotification(`You have voted for "${anecdote.content}"`))
                        setTimeout(() => {
                            dispatch(printNotification(''))
                        }, 5000);
                    }
                    }
                />
            )}
        </div>
    )
}

export default Anecdotes