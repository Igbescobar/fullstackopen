import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
    const users = useSelector(state => state.users)
    const id = useParams().id
    const user = users.find(n => n.id === id)

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.username}</h2>
            <h5>Added Blogs</h5>
            <ul>
                {user.blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
        </div>
    );
}

export default User;
