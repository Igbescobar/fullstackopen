import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addLike } from "../reducers/blogReducer";
import BlogComment from "./BlogComment";

const IndividualBlog = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find(n => n.id === id)

    if (!blog) {
        return null
    }

    const handleLikes = () => {
        dispatch(addLike(blog))
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <br />
            <a href="${blog.url}">{blog.url}</a>
            <p>{blog.likes} likes <button onClick={handleLikes}>like</button></p>
            <p>added by {blog.author}</p>
            <BlogComment id={id} />

        </div>
    );
}

export default IndividualBlog;