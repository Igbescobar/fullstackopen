import { useDispatch } from "react-redux";
import { createComment } from "../reducers/commentReducer";
import { setNotification } from "../reducers/notificationReducer";

const AddCommentForm = ({ id }) => {
    const dispatch = useDispatch()

    const addComment = async (e) => {
        e.preventDefault()
        const newComment = e.target.Comment.value
        console.log(newComment)
        e.target.Comment.value = ''
        dispatch(createComment(id, newComment))
        dispatch(setNotification(`a new comment ${newComment} added`, 5))
    }

    return (
        <div>
            <form onSubmit={addComment}>
                <div>
                    comment
                    <input
                        name='Comment'
                        placeholder='write a comment'
                    />
                </div>
                <button id='create-button' type='submit'>add a comment</button>
            </form>
        </div>
    );
}

export default AddCommentForm;