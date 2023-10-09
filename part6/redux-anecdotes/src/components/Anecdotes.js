import { useDispatch, useSelector } from "react-redux";
import { newVote } from "../reducers/anecdoteReducer";

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
            anecdote.content
                .toLowerCase()
                .includes(state.filters.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
    })

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() =>
                        dispatch(newVote(anecdote.id))
                    }
                />
            )}
        </div>
    )
}

export default Anecdotes