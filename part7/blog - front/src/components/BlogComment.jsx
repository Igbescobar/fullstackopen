import { useDispatch, useSelector } from "react-redux";
import AddCommentForm from "./AddCommentForm";
import { useEffect } from "react";
import { initializeComments } from "../reducers/commentReducer";

const BlogComment = ({ id }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeComments(id))
    }, [dispatch])

    const comments = useSelector(state => state.comments)
    console.log('this are the comments', comments)


    return (
        <div>
            <h3>comments</h3>
            <AddCommentForm id={id} />
            {comments.map((comment) => {
                return <li key={comment.id}>{comment.content}</li>
            })}
        </div>
    );
}

export default BlogComment;