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
    const anecdotes = useSelector(state => state)
    const sortedAnecdotes = [...anecdotes.sort((a, b) => {
        return b.votes - a.votes
    })]

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
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