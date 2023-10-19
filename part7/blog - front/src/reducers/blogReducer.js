import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogsService"

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        appendBlog: (state, action) => {
            return state.concat(action.payload);
        },
        setBlog: (state, action) => {
            return action.payload;
        },
        voteBlog: (state, action) => {
            const id = action.payload.id
            console.log('this is the object', action.payload)

            const blogToChange = action.payload

            return state.map(blog =>
                blog.id !== id ? blog : blogToChange
            )
        },
        deleteBlog: (state, action) => {
            const id = action.payload
            return state.filter(blog => blog.id !== id);
        }
    }
})

export const { appendBlog, setBlog, voteBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch(setBlog(blogs))
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogsService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const addLike = blog => {
    return async dispatch => {
        try {
            const updatedBlog = { ...blog, likes: blog.likes + 1 };

            await blogsService.update(updatedBlog);

            dispatch(voteBlog(updatedBlog));

        } catch (error) {
            console.error("Error while liking blog:", error);
        }
    };
};

export const deleteBlogs = id => {
    return async dispatch => {
        try {
            const deletedBlog = await blogsService.remove(id);
            console.log('this is the blog', deleteBlog)
            dispatch(deleteBlog(id))
        } catch (error) {
            console.error("Error while deleting blog:", error);
        }
    };
};

export default blogSlice.reducer